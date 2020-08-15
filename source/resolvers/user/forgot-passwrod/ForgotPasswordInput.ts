import { InputType, Field } from 'type-graphql';
import { PasswordInput } from '../../../common/PasswordInput';

@InputType()
export class ForgotPasswordInput extends PasswordInput {
    
    @Field()
    token: string;

}