import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from 'class-validator';
import { User } from '../../../entities/User';

@ValidatorConstraint({async: true})
export class IsEmailAlreadyExistsConstraint implements ValidatorConstraintInterface {
    
    async validate(email: string): Promise<boolean> {
        const user = await User.findOne({where: {email}});
        if(user) {
            return false;
        } else {
            return true;
        }
    }
}

export function isEmailAlreadyExists(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistsConstraint
        })
    }
}