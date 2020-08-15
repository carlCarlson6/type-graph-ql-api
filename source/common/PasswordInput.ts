import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class PasswordInput {

    @Field()
    @Length(6, undefined, {message: 'password must be 6 characters min'})
    password: string;

}