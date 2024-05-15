import { createServer } from "express-zod-api";
import { config } from "./config";
import { routing } from "./routing";

import { socketModule } from "./socket";
import { attachSockets } from "zod-sockets";

/**
 * "await" is only needed for using entities retuned from this method.
 * If you can not use await (on the top level of CJS), use IIFE wrapper:
 * @example (async () => { await ... })()
 * */
(async()=>{
    try {
        const { httpServer, httpsServer } = await createServer(config, routing)
        attachSockets({ 
            io: socketModule.io,
            config: socketModule.config,
            actions: [...socketModule.actions],
            target: httpsServer || httpServer 
        })
    } catch (error) {
        console.error("Error starting the server", error);
    }
})()