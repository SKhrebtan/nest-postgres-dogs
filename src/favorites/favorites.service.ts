import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}
  create(createFavoriteDto: CreateFavoriteDto, id: number) {
    const newFavorite = {
      title: createFavoriteDto.title,
      price: createFavoriteDto.price,
      user: { id },
      dog: { id: +createFavoriteDto.dog },
    };
    if (!newFavorite) throw new BadRequestException('Something went wrong');
    return this.favoriteRepository.save(newFavorite);
  }

  async findAll(id: number) {
    const favorites = await this.favoriteRepository.find({
      where: { user: { id } },
      order: { createdAt: 'DESC' },
    });

    if (!favorites) throw new BadRequestException('Something went wrong');
    return favorites;
  }

  async findAllByDog(id: number) {
    const favorites = await this.favoriteRepository.find({
      where: { dog: { id } },
      order: { createdAt: 'DESC' },
    });

    if (!favorites) throw new BadRequestException('Something went wrong');
    return favorites;
  }

  async findOne(id: number) {
    const favorite = await this.favoriteRepository.findOne({
      where: { id },
      relations: {
        user: true,
        dog: true,
      },
    });
    if (!favorite) throw new NotFoundException('Favorite not found');
    return favorite;
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    const favorite = await this.favoriteRepository.findOne({ where: { id } });

    if (!favorite) throw new NotFoundException('Favorite not found');
    await this.favoriteRepository.update(id, updateFavoriteDto);
    const updatedFavorite = await this.favoriteRepository.findOne({
      where: { id },
    });
    return updatedFavorite;
  }

  async delete(id: number) {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        id,
      },
    });
    if (!favorite) throw new NotFoundException('favorite not found');
    await this.favoriteRepository.delete(id);
    return favorite;
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const favorites = await this.favoriteRepository.find({
      where: {
        user: { id },
      },
      // relations: {
      //   user: true,
      //   dog: true,
      // },
      order: {
        createdAt: 'ASC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
    if (!favorites) throw new BadRequestException('Something went wrong...');
    return favorites;
  }
}
