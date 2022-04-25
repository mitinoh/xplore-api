import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DayAvaiable } from '../entities/dayavaiable.interface';

@ValidatorConstraint({ name: 'DayAvaiableValidator', async: true })
@Injectable()
export class DayAvaiableValidator implements ValidatorConstraintInterface {
  async validate(dayAvaiable: DayAvaiable) {
    if(dayAvaiable.day >= 0 && dayAvaiable.day < 7
      && dayAvaiable.start >= 0 && dayAvaiable.start <= 24
      && dayAvaiable.end >= 0 && dayAvaiable.end <= 24)
      return true;
   
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `day avaiable obj not valid`;
  }
}

export function DayAvaiableRule(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'DayAvaiableRule',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: DayAvaiableValidator,
    });
  };
}
