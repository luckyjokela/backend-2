import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterUserDto {
  // id?: string;  // ← не нужен, генерируется на сервере

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(3)
  username!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(2)
  surname!: string;

  @IsOptional() // ← СДЕЛАЙ ОПЦИОНАЛЬНЫМ!
  @IsString()
  middleName?: string; // ← ? означает optional
}
