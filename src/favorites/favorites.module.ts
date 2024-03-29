import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from 'src/dogs/entities/dog.entity';
import { DogsService } from 'src/dogs/dogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Dog])],
  controllers: [FavoritesController],
  providers: [FavoritesService, DogsService],
})
export class FavoritesModule {}
