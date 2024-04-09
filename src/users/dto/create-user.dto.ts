import { MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'password must be more than 6 symbols' })
  password: string;

  avatar?: string;

  role: string;
}
