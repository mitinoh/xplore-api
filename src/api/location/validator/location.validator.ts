import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Coordinate } from '../entities/coordinate.interface';

@ValidatorConstraint({ name: 'CoordinateValidator', async: true })
@Injectable()
export class CoordinateValidator implements ValidatorConstraintInterface {
  async validate(coordinate: Coordinate) {
    if (coordinate && coordinate.lat != undefined && coordinate.lng != undefined && coordinate.alt != undefined) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `Coordinate not valid`;
  }
}

export function CoordinateRule(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'CoordinateRule',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CoordinateValidator,
    });
  };
}
