import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateDogDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  image: string;

  @IsOptional()
  user?: User;
}

// import { IsNotEmpty, IsOptional } from 'class-validator';
// import { User } from 'src/users/entities/user.entity';

// export class CreateDogDto {
//   @IsNotEmpty()
//   name: string;
//   @IsNotEmpty()
//   breed: string;

//   file: Express.Multer.File;

//   @IsOptional()
//   user?: User;
// }
