import { IsNotEmpty } from 'class-validator';

export class CreateNewDogDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  breed: string;

  file: Express.Multer.File;
}
