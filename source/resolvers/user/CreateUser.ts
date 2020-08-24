import {Resolver} from 'type-graphql';
import { User } from '../../entities/User';
import { RegisterInput } from './register/RegisterInput';
import { createBaseResolver } from '../createBaseResolver';


const BaseCreateUser = createBaseResolver("User", User, RegisterInput, User);

@Resolver()
export class CreateUserResolver extends BaseCreateUser { }