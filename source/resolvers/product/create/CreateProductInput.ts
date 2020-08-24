import { InputType, Field } from "type-graphql";

@InputType()
export class CreateProductInput {
    @Field()
    name: string;
}