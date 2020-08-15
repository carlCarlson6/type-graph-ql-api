import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    const userAuth: boolean = !!context.req.session!.userId;
    if(!userAuth) {
        throw new Error('not authenticated');
    }
    
    return next();
}