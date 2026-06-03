import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  login!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

export class ValidateUserDto {
  @IsString()
  id!: string;

  @IsEmail()
  email!: string;

  @IsString()
  username!: string;

  @IsString()
  role!: string;
}
