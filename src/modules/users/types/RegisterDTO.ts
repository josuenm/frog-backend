import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

function isValidUsername(username: string) {
  const regex = /^[a-zA-Z0-9_]+$/;
  return regex.test(username);
}

export function IsValidUsername(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isValidUsername',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (
            value === undefined ||
            value === null ||
            typeof value !== 'string'
          ) {
            return false;
          }
          return isValidUsername(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must contain only letters, numbers and underscores (_).`;
        },
      },
    });
  };
}

enum Gender {
  male = 'male',
  female = 'female',
}

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @MinLength(1)
  @MaxLength(25)
  @IsString()
  @IsNotEmpty()
  @IsValidUsername()
  username: string;

  @IsDate()
  @IsNotEmpty()
  dateBirth: Date;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @MaxLength(255)
  @IsNotEmpty()
  password: string;
}
