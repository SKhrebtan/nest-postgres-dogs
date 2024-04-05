import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewDog } from './entities/newdog.entity';
import { CreateNewDogDto } from './dto/create-new-dog.dto';

@Injectable()
export class AllDogsService {
  constructor(
    @InjectRepository(NewDog)
    private readonly newDogRepository: Repository<NewDog>,
  ) {}

  async create(createNewDogDto: CreateNewDogDto, imageUrl: string) {
    const isExist = await this.newDogRepository.findBy({
      name: createNewDogDto.name,
    });

    if (isExist.length) throw new BadRequestException('This dog already exist');
    const newDog = {
      name: createNewDogDto.name,
      breed: createNewDogDto.breed,
      image: imageUrl,
    };

    return this.newDogRepository.save(newDog);
  }
}
