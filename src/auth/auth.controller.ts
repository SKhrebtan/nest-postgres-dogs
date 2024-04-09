import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Get,
  Patch,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from 'src/users/user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('auth')
export class AuthController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Patch('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  async updateUsersAvatar(
    @Req() req,
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
      imageUrl = await this.cloudinaryService.uploadFile(file, 'avatars');
      console.log(imageUrl);
    }
    return this.authService.updateAvatar(req.user, imageUrl.url);
  }

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  // return this.authService.signIn(signInDto.username, signInDto.password);
  // }
}
