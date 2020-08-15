import { Resolver, Mutation, Arg } from "type-graphql";
import bycrypt from 'bcryptjs';
import { User } from "../../entities/User";
import { redis } from "../../redis";
import { createUrl } from "../../common/utils/createUrl";
import { sendEmail } from "../../common/utils/sendEmail";
import { forgotPasswordPrefix } from "../../common/RedisPrefixes";

@Resolver()
export class ForgotPasswordResolver {
    
    @Mutation(() => Boolean)
    async forgotPassword(@Arg('email') email: string): Promise<Boolean> {
        const user = await User.findOne({where:{email}})
        if(!user) { throw new Error('the user does not exists')}

        const confirmationUrl = await createUrl(user.id, 'user/reset-password', forgotPasswordPrefix);
        await sendEmail(email, confirmationUrl, 'change your password');

        return true;
    }

    @Mutation(() => Boolean)
    async changePassword(@Arg('token') token: string, @Arg('newPassword') newPassword: string): Promise<Boolean> {
        const userId = await redis.get(token);
        if(!userId) { return false }
        
        const hashedNewPassword = await bycrypt.hash(newPassword, 10);
        await User.update({id: parseInt(userId, 10)}, {password: hashedNewPassword})

        await redis.del(token);

        return true;
    }
}