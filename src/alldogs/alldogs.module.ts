import { Module } from '@nestjs/common';
import { AllDogsService } from './alldogs.service';
import { AllDogsController } from './alldogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewDog } from './entities/newdog.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([NewDog]), CloudinaryModule],
  controllers: [AllDogsController],
  providers: [AllDogsService],
  exports: [AllDogsService],
})
export class AllDogsModule {}
