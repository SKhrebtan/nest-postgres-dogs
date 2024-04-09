import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (user && passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException('User or password is incorrect');
  }
  async login(user: IUser) {
    const { id, email, role, avatar } = user;
    return {
      id,
      email,
      role,
      avatar,
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        role,
      }),
    };
  }

  async validateOwner(id: number) {
    return;
  }
  // async signIn(
  //   username: string,
  //   pass: string,
  // ): Promise<{ access_token: string }> {
  //   const user = await this.userService.findOne(username);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = {
  //     id: user.id,
  //     email: user.email,
  //   };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }

  async updateAvatar(user, imageUrl: string) {
    const { id, email } = user;
    const isExist = await this.userService.findOne(email);
    console.log(isExist);
    console.log(user);

    if (!isExist) throw new BadRequestException('User is not eexist');
    const avatar = imageUrl;

    return this.userService.update(id, avatar);
  }
}
