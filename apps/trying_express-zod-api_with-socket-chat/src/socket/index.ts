import { createSimpleConfig } from "zod-sockets";
import { ActionsFactory } from "zod-sockets";
import { z } from "zod";
import { Server } from "socket.io";
//import express from "express";

/*
 * Egress Events:
 * - enter_chat
 * - leave_chat
 * - new_messages
 * Ingress Events:
 * - ping
 * - message
 * - onStartup
 * - onConnection
 * - onDisconnect
*/
/************* mermaid **********************
 * sequenceDiagram
    participant Client1 as Client 1
    participant Client2 as Client 2
    participant Server as Chat Server

    Note right of Server: Server Startup
    Server->>Server: onStartup
    Server->>Server: Log "Server started"

    Note right of Client1: Client 1 Connects
    Client1->>Server: Connect
    Server->>Client1: Connection Acknowledgement
    Server->>Client2: emit enter_chat {sessionId: client1.id}
    Server->>Server: Add Client1 to global_room
    Server->>global_room: broadcast enter_chat {sessionId: client1.id}
    
    Note right of Client2: Client 2 Connects
    Client2->>Server: Connect
    Server->>Client2: Connection Acknowledgement
    Server->>Client1: emit enter_chat {sessionId: client2.id}
    Server->>Server: Add Client2 to global_room
    Server->>global_room: broadcast enter_chat {sessionId: client2.id}

    Note right of Client1: Client 1 Sends Message
    Client1->>Server: emit message {msg: "Hello, world!"}
    Server->>Server: Process Message
    Server->>global_room: broadcast new_messages {msg: "Hello, world!"}
    Server->>Client1: emit new_messages {msg: "Hello, world!"}

    Note right of Client2: Client 2 Receives Message
    Server-->>Client2: new_messages {msg: "Hello, world!"}
    Client2->>Client2: Display Message

    Note right of Client1: Client 1 Disconnects
    Client1->>Server: Disconnect
    Server->>Server: Remove Client1 from global_room
    Server->>global_room: broadcast leave_chat {sessionId: client1.id}
    global_room->>Client2: emit leave_chat {sessionId: client1.id}
    Server->>Server: Log "User disconnected"
 */
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
          return_current_room_context: { schema: z.tuple([z.array(userSchema)]) },
          new_messages: { schema: z.tuple([messageSchema])},
        },
        hooks: {
            onStartup: async ({ logger, all }) => {
                //logger.debug("Server started");
            },
            onConnection: async ({ logger, client, all, withRooms }) => {
                await client.join("global_room");
                //logger.debug("All rooms", all.getRooms());
                await withRooms("global_room").broadcast("enter_chat", {sessionId: client.id});
                //await client.emit("enter_chat", {sessionId: client.id});// emit to self not working
            },
            onDisconnect: async ({ logger, client, all, withRooms }) => {
                //logger.debug("Disconnected user", client.id);
                await client.leave("global_room");
                await withRooms("global_room").broadcast("leave_chat", {sessionId: client.id});
                await client.emit("leave_chat", {sessionId: client.id});
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

// ingress
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

const onGetRoomContext = actionsFactory.build({
    event: 'get_room_context',
    input: z.tuple([]),
    handler: async ({ input, client, withRooms, all }) => {
        console.log("Getting room context2");
        const roomClientIds = await withRooms("global_room").getClients().then(clients => clients.map(client => ({sessionId: client.id})));
        client.emit("return_current_room_context", roomClientIds); // Emit the current room context to the client
    }
});


/** @see https://socket.io/docs/v4/server-options/ */
export const socketModule = {
    config,
    actionsFactory,
    actions: [onPing, onMessage, onGetRoomContext],
    io:new Server({ 
        cors: {
          origin: "*", 
          methods: ["GET", "POST"]
        }
      })
}


