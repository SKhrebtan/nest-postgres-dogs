import { FavoritesService } from 'src/favorites/favorites.service';
import { DogsService } from './../dogs/dogs.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly dogsService: DogsService,
    private readonly favoritesService: FavoritesService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id, type } = request.params;
    let entity;

    switch (type) {
      case 'dog':
        entity = await this.dogsService.findOne(id);
        break;
      case 'favorite':
        entity = await this.favoritesService.findOne(id);
        break;
      default:
        throw new NotFoundException('something went wrong...');
    }

    const user = request.user;
    if (
      (entity && user && user.id === entity.user.id) ||
      user.role === 'admin'
    ) {
      return true;
    }
    return false;
  }
}
