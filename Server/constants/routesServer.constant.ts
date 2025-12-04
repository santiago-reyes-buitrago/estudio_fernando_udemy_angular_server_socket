import type {RoutesInterface} from "../interfaces/routes.interface.js";
import {messageRouter} from "../../messages/message.router.js";

export const ROUTES_SERVER: RoutesInterface[] = [
    {url: '/',router: messageRouter}
]