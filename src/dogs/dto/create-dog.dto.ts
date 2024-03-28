import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateDogDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  breed: string;

  @IsOptional()
  user?: User;
}
