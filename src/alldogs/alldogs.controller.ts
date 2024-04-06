import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AllDogsService } from './alldogs.service';
import { CreateNewDogDto } from './dto/create-new-dog.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { HasRoles } from 'src/role/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/role/roles.enum';

@Controller('alldogs')
export class AllDogsController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private allDogsService: AllDogsService,
  ) {}

  @HasRoles(Role.Admin)
  @Post('new-dog')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  async createNewDog(
    @Body() createNewDogDto: CreateNewDogDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    let imageUrl;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadFile(file);
    }
    return this.allDogsService.create(createNewDogDto, imageUrl.url);
  }

  @Get('alldogs')
  findAllDogs() {
    return this.allDogsService.findAllDogs();
  }

  @HasRoles(Role.Admin)
  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id') id: number) {
    return this.allDogsService.findOne(id);
  }

  @HasRoles(Role.Admin)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  delete(@Param('id') id: number) {
    return this.allDogsService.delete(id);
  }
}
