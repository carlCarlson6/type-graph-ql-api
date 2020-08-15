import { Length } from 'class-validator';
import { InputType, Field, ClassType } from 'type-graphql';


export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {

    @InputType()
    class PasswordInput extends BaseClass {
        @Field()
        @Length(6, undefined, {message: 'password must be 6 characters min'})
        password: string;
    }

    return PasswordInput;
}