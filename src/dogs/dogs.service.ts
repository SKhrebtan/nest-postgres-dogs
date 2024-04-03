import { UpdateDogDto } from './dto/update-dog.dto';
import { CreateDogDto } from './dto/create-dog.dto';
import {
  BadGatewayException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SearchDTO } from './dto/search-dto.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
  ) {}

  async create(createDogDto: CreateDogDto, imageUrl: string, id: number) {
    const isExist = await this.dogRepository.findBy({
      user: { id },
      name: createDogDto.name,
    });

    if (isExist.length) throw new BadRequestException('This dog already exist');
    const newDog = {
      name: createDogDto.name,
      breed: createDogDto.breed,
      image: imageUrl,
      user: {
        id,
      },
    };

    return this.dogRepository.save(newDog);
  }

  async findAll(id: number) {
    return this.dogRepository.find({
      where: {
        user: { id },
      },
      relations: {
        favorites: true,
      },
    });
  }

  async findAllDogs() {
    return this.dogRepository.find({
      relations: {
        favorites: true,
      },
    });
  }

  async findOne(id: number) {
    const dog = await this.dogRepository.findOne({
      where: { id },
      relations: {
        user: true,
        favorites: true,
      },
    });
    if (!dog) throw new NotFoundException('Dog is not found');
    return dog;
  }

  async update(id: number, updateDogDto: UpdateDogDto) {
    const dog = await this.dogRepository.findOne({
      where: {
        id,
      },
    });
    if (!dog) throw new NotFoundException('Dog not found');
    await this.dogRepository.update(id, updateDogDto);
    return dog;
  }

  async delete(id: number) {
    const dog = await this.dogRepository.findOne({
      where: {
        id,
      },
    });
    if (!dog) throw new NotFoundException('Dog not found');
    await this.dogRepository.delete(id);
    return dog;
  }
}
