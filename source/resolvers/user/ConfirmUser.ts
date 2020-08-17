import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entities/User";
import { redis } from "../../redis";
import { confirmUserPrefix } from "../../common/RedisPrefixes";

@Resolver()
export class ConfirmUserResolver {
    
    @Mutation(() => Boolean)
    async confirmUser(@Arg('token') token: string): Promise<Boolean> {
        const userId = await redis.get(token);
        if(!userId) { return false }
        
        await User.update({id: parseInt(userId, 10)}, {confirmed: true})
        await redis.del(confirmUserPrefix+token);

        return true;
    }
}