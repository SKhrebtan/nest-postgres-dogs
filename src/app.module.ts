import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { DogsModule } from './dogs/dogs.module';
import { LoggerMiddleware } from './logger.middleware';
import { DogsController } from './dogs/dogs.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: 'postgres://postgresdb:Etiq1xHjuTdoqDbTZvmydQARpMP5xJ2A@dpg-co2qni4f7o1s73co84t0-a.oregon-postgres.render.com/nest_6wru',
        ssl: {
          rejectUnauthorized: false,
        },
        // host: configService.get('DB_HOST'),
        // port: configService.get('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
    }),
    DogsModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FavoritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'dogs', method: RequestMethod.POST }, 'dogs/(.*)')
      .forRoutes(DogsController);
  }
}
