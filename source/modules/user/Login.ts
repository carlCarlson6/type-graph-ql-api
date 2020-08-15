import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bycrypt from 'bcryptjs';
import { User } from "../../entities/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LoginResolver {
    
    @Mutation(() => User, {nullable: true})
    async login(@Arg('password') password: string, @Arg('email') email: string, @Ctx() context: MyContext): Promise<User | null> {
        const user = await User.findOne({where: {email}});
        if(!user) { return null }

        const valid = await bycrypt.compare(password, user.password);
        if(!valid) { return null }

        if(!user.confirmed){ throw new Error('this account is not confirmed check your email') }

        context.req.session!.userId = user.id;
        return user;
    }
}