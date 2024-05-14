import { createServer } from "express-zod-api";
import { config } from "./config";
import { routing } from "./routing";

/**
 * "await" is only needed for using entities retuned from this method.
 * If you can not use await (on the top level of CJS), use IIFE wrapper:
 * @example (async () => { await ... })()
 * */
(async()=>{
    try {
        await createServer(config, routing)
    } catch (error) {
        console.error("Error starting the server", error);
    }
})()