import { z } from "zod";
import { invalidKey } from "./errors";
import { createMiddleware } from "express-zod-api";

export const authMiddleware = createMiddleware({
  security: {
    // this information is optional and used for generating documentation
    and: [
      { type: "input", name: "key" },
      { type: "header", name: "token" },
    ],
  },
  input: z.object({
    key: z.string().min(4),
  }),
  middleware: async ({ input: { key }, request, logger }) => {
    logger.debug("Checking the key and token");
    const user = key
    if (!user) {
      throw invalidKey()
    }
    return { user }; // provides endpoints with options.user
  },
});