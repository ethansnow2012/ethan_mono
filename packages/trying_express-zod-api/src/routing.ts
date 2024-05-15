import { Routing } from "express-zod-api";
import { 
    helloWorldEndpoint,
    authNeededEndpoint,
    justThrowError
} from "./endpoint";


export const routing: Routing = {
  //"":indexPage,
  v1: {
    hello: helloWorldEndpoint,
    authByKey: authNeededEndpoint,
    justThrowError:justThrowError
  },
};