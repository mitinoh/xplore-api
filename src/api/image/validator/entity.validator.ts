import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';


import { assetDir } from '../../../app.properties';

@ValidatorConstraint({ name: 'EntityValidator', async: true })
@Injectable()
export class EntityValidator implements ValidatorConstraintInterface {
  async validate(entity: string) {

    let keys: string[] = []
    for (const [key, value] of Object.entries(assetDir)) {
        keys.push(key)
    }
    return keys.includes(entity);
  }

  defaultMessage(args: ValidationArguments) {
    let keys: string[] = []
    for (const [key, value] of Object.entries(assetDir)) {
        keys.push(key)
    }
    return `entity not valid, must be: ` +keys.join(" | ") ;
  }
}

export function EntityRule(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'EntityRule',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: EntityValidator,
    });
  };
}
