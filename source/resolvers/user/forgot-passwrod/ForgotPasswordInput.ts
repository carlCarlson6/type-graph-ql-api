import { InputType, Field } from 'type-graphql';
import { PasswordMixin } from '../../../common/PasswordInput';

@InputType()
export class ForgotPasswordInput extends PasswordMixin(class {}) {
    
    @Field()
    token: string;

}