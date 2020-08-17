import { Query, Resolver, Ctx } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entities/User";

@Resolver()
export class MeResolver {
    
    @Query(() => User, {nullable: true})
    async me(@Ctx() context: MyContext): Promise<User | undefined> {
        if(!context.req.session!.userId) { throw new Error('you are not authenticated') }
        
        const user = await User.findOne(context.req.session!.userId);
        return user;
    }
}