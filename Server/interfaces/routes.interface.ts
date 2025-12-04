import type {Router} from "express";

export interface RoutesInterface {
    url: string
    router: Router
}