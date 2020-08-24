import { ClassType, Resolver, Mutation, Arg } from "type-graphql";

export const createBaseResolver = <T extends ClassType, J extends ClassType> (suffix: string, returnType: T, inputType: J, entity: any) => {
    @Resolver({isAbstract: true})
    abstract class BaseResolver {

        @Mutation(() => returnType, {name:`create${suffix}`})
        async create(@Arg('data', () => inputType) data: J): Promise<T> {
            return entity.create(data).save();
        }
    }

    return BaseResolver;
}
