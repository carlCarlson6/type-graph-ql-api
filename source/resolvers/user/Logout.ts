import { Resolver, Mutation, Ctx } from "type-graphql";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LogoutResolver {
    
    @Mutation(() => Boolean)
    async logout(@Ctx() context: MyContext): Promise<Boolean> {
        return new Promise((resolve, reject) => context.req.session!.destroy((err) => {
            if(err){
                console.log(err);
                return reject(false);
            }

            context.res.clearCookie('rdscookie');
            return resolve(true);
        }));
        
    }

}