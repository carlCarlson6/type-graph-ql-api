import { Query, Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import bycrypt from 'bcryptjs';
import { User } from "../../entities/User";
import {RegisterInput} from "./register/RegisterInput";
import { isAuth } from "../../middleware/isAuth";
import { logger } from "../../middleware/logger";
import { sendEmail } from "../../common/utils/sendEmail";
import { createUrl } from "../../common/utils/createUrl";
import { confirUserPrefix } from "../../common/RedisPrefixes";


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

        const confirmationMailUrl = await createUrl(user.id, 'user/confirm-account', confirUserPrefix);
        await sendEmail(email, confirmationMailUrl, 'confirmation account');
        
        return user;
    }
}