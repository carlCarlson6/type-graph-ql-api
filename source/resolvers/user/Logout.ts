import { Resolver, Mutation, Ctx } from "type-graphql";
import { User } from "../../entities/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LogoutResolver {
    
    @Mutation(() => User, {nullable: true})
    async logout(@Ctx() context: MyContext): Promise<void> {

    }
}