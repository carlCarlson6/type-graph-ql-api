import { Query, Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import bycrypt from 'bcryptjs';
import { User } from "../../entities/User";
import {RegisterInput} from "./register/RegisterInput";
import { isAuth } from "../../middleware/isAuth";
import { logger } from "../../middleware/logger";

@Resolver()
export class RegisterResolver {
    
    @UseMiddleware(isAuth, logger)
    @Query(() => String, {nullable: true, description: "some description"})
    async hellowWorld() {
        return 'bye world';
    }

    @Mutation(() => User)
    async register(@Arg('data') {email, firstName, lastName, password}: RegisterInput): Promise<User> {
        const hashedPassword = await bycrypt.hash(password, 10);

        const user = User.create({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        return user;
    }
}