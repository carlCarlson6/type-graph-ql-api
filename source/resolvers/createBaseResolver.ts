import { ClassType, Resolver, Mutation, Arg, MiddlewareFn, UseMiddleware } from "type-graphql";

export const createBaseResolver = <T extends ClassType, J extends ClassType> (suffix: string, returnType: T, inputType: J, entity: any, middlewares?: Array<MiddlewareFn<any>>) => {
    @Resolver({isAbstract: true})
    abstract class BaseResolver {

        @Mutation(() => returnType, {name:`create${suffix}`})
        @UseMiddleware(...(middlewares || []))
        async create(@Arg('data', () => inputType) data: J): Promise<T> {
            return entity.create(data).save();
        }
    }

    return BaseResolver;
}
