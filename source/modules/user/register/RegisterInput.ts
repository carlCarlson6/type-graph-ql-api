import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { isEmailAlreadyExists } from './isEmailAlreadyExists';

@InputType()
export class RegisterInput {
    
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
    
    @Field()
    @Length(6, undefined, {message: 'password must be 6 characters min'})
    password: string;

}