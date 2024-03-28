import { IsNotEmpty } from 'class-validator';

export class UpdateDogDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  breed: string;
}
