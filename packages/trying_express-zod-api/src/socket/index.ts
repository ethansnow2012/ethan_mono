import { createSimpleConfig } from "zod-sockets";
import { ActionsFactory } from "zod-sockets";
import { z } from "zod";
import { Server } from "socket.io";
//import express from "express";

const messageSchema = z.object({
    msg: z.string(),
})
const userSchema = z.object({
    sessionId: z.string(),
})
const config = createSimpleConfig(
    {
        emission: { // Egress
          enter_chat: { schema: z.tuple([userSchema]) },
          leave_chat: { schema: z.tuple([userSchema]) },
          new_messages: { schema: z.tuple([messageSchema])},
        },
        hooks: {
            onStartup: async ({ logger, all }) => {
                logger.debug("Server started");
                //logger.debug("All rooms", all.getRooms());
            },
            onConnection: async ({ logger, client, all, withRooms }) => {
                await client.join("global_room");
                logger.debug("All rooms", all.getRooms());
                await withRooms("global_room").broadcast("enter_chat", {sessionId: client.id});
            },
            onDisconnect: async ({ logger, client, all, withRooms }) => {
                logger.debug("Disconnected user", client.id);
                await client.leave("global_room");
                await withRooms("global_room").broadcast("leave_chat", {sessionId: client.id});
            },
        },
      }
); // shorthand for root namespace only
const actionsFactory = new ActionsFactory(config);


// ingress
const onPing = actionsFactory.build({
    event: "ping",
    input: z.tuple([]).rest(z.unknown()),
    output: z.tuple([z.literal("pong")]).rest(z.unknown()),
    handler: async ({ input }) => ["pong", ...input] as const,
});

// egress
const onMessage = actionsFactory.build({
    event: 'message',
    input: z.tuple([z.string()]),
    handler: async ({ input, client, withRooms, all }) => {
        console.log("Message received from client:", input);
        //socketModule.io.emit('message', input); // unwrapped socket.io instance
        await withRooms("global_room").broadcast("new_messages", {msg: input[0]});
        await client.emit("new_messages", {msg: input[0]});
    }
});


/** @see https://socket.io/docs/v4/server-options/ */
export const socketModule = {
    config,
    actionsFactory,
    actions: [onPing, onMessage],
    io:new Server({ 
        cors: {
          origin: "*", 
          methods: ["GET", "POST"]
        }
      })
}


