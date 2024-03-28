import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dog } from 'src/dogs/entities/dog.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateFavoriteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  dog: Dog;

  //   @IsNotEmpty()
  //   user: User;
}
