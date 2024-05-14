import { createSimpleConfig } from "zod-sockets";
import { ActionsFactory } from "zod-sockets";
import { z } from "zod";
import http from "node:http";
import { Server } from "socket.io";
import { attachSockets } from "zod-sockets";

const config = createSimpleConfig(); // shorthand for root namespace only
const actionsFactory = new ActionsFactory(config);

const onPing = actionsFactory.build({
    event: "ping",
    input: z.tuple([]).rest(z.unknown()),
    output: z.tuple([z.literal("pong")]).rest(z.unknown()),
    handler: async ({ input }) => ["pong", ...input] as const,
});

attachSockets({
  /** @see https://socket.io/docs/v4/server-options/ */
  io: new Server(),
  config: config,
  actions: [onPing],
  target: http.createServer().listen(8090),
});

/**
 * curl "http://localhost:8090/socket.io/?EIO=4&transport=polling" 
 * =====>> {"sid":"eAs7EK0OJn0NteO9AAAC","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":20000,"maxPayload":1000000}%                          
 */