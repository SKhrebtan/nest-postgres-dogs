import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/role/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dog, Favorite]), CloudinaryModule],
  controllers: [DogsController],
  providers: [DogsService, FavoritesService],
  exports: [DogsService],
})
export class DogsModule {}
