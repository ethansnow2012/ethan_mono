import { createSimpleConfig } from "zod-sockets";
import { ActionsFactory } from "zod-sockets";
import { z } from "zod";
import { Server } from "socket.io";

const config = createSimpleConfig(); // shorthand for root namespace only
const actionsFactory = new ActionsFactory(config);

const onChat = actionsFactory.build({
    // ns: "/", // optional, root namespace is default
    event: "chat",
    input: z.tuple([z.string()]),
    handler: async ({ input: [message], client, all, withRooms, logger }) => {
      /* your implementation here */
      // typeof message === "string"
    },
  });
const onPing = actionsFactory.build({
    event: "ping",
    input: z.tuple([]).rest(z.unknown()),
    output: z.tuple([z.literal("pong")]).rest(z.unknown()),
    handler: async ({ input }) => ["pong", ...input] as const,
});
const onMessage = actionsFactory.build({
    event: 'message',
    input: z.tuple([z.string()]),
    handler: async ({ input }) => {
        console.log("Message received from client:", input);
        //socketModule.io.emit('message', input); // Broadcast the message to all clients
    }
});
/** @see https://socket.io/docs/v4/server-options/ */
export const socketModule = {
    config,
    actionsFactory,
    actions: [onPing, onChat, onMessage],
    io:new Server({ 
        cors: {
          origin: "*", 
          methods: ["GET", "POST"]
        }
      })
}


