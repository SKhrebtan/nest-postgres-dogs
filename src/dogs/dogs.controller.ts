import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { PassportModule } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Query,
  HttpStatus,
  HttpException,
  ParseIntPipe,
  DefaultValuePipe,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Patch,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './interfaces/dog.interface';
import { DogsService } from './dogs.service';
import { HasRoles } from 'src/role/roles.decorator';
import { Role } from 'src/role/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/role/roles.guard';

@Controller('dogs')
export class DogsController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private dogsService: DogsService,
  ) {}
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadImage(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
  //         new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   return this.cloudinaryService.uploadFile(file);
  // }

  // @HasRoles(Role.Admin)
  // @Post('alldogs')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // @UsePipes(new ValidationPipe())
  // async createNewDog(
  //   @Body() createDogDto: CreateDogDto,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
  //         new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  //   @Req() req,
  // ) {
  //   let imageUrl;
  //   if (file) {
  //     imageUrl = await this.cloudinaryService.uploadFile(file);
  //   }
  //   return this.dogsService.create(createDogDto, imageUrl.url, req.user.id);
  // }
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body() createDogDto: CreateDogDto, @Req() req) {
    return this.dogsService.create(createDogDto, req.user.id);
  }
  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // @UsePipes(new ValidationPipe())
  // async create(
  //   @Body() createDogDto: CreateDogDto,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
  //         new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  //   @Req() req,
  // ) {
  //   let imageUrl;
  //   if (file) {
  //     imageUrl = await this.cloudinaryService.uploadFile(file);
  //   }
  //   return this.dogsService.create(createDogDto, imageUrl.url, req.user.id);
  // }

  @Get('alldogs')
  findAllDogs() {
    return this.dogsService.findAllDogs();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.dogsService.findAll(req.user.id);
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: number) {
    return this.dogsService.findOne(id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(@Param('id') id: number, @Body() updateDogDto: UpdateDogDto) {
    return this.dogsService.update(id, updateDogDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  delete(@Param('id') id: number) {
    return this.dogsService.delete(id);
  }

  // @Roles(Role.Admin)
}
