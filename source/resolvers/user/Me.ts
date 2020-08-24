import { Query, Resolver, Ctx, UseMiddleware } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entities/User";
import { isAuth } from "../../middleware/isAuth";
import { logger } from "../../middleware/logger";

@Resolver()
export class MeResolver {
    
    @Query(() => User, {nullable: true})
    @UseMiddleware(isAuth, logger)
    async me(@Ctx() context: MyContext): Promise<User | undefined> {
        
        const user = await User.findOne(context.req.session!.userId);
        return user;
    }
}