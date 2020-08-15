import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { isEmailAlreadyExists } from './isEmailAlreadyExists';
import { PasswordMixin } from '../../../common/PasswordInput';

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
    
    @Field()
    @Length(1, 255, {message: 'firtName can not be empty or null'})
    firstName: string;
    
    @Field()
    @Length(1, 255, {message: 'lastName can not be empty or null'})
    lastName: string;
    
    @Field() 
    @IsEmail(undefined, {message: 'this is not a valid email'})
    @isEmailAlreadyExists({message: 'the email already exists'})
    email: string; 
    
}