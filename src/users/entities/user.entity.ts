import { Dog } from 'src/dogs/entities/dog.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default:
      'Username',
  })
  name: string;
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default:
      'http://res.cloudinary.com/dwzeqka9z/image/upload/v1712689299/avatars/mgacvubtkjwjjrg3kvvs.jpg',
  })
  avatar: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Dog, (dog) => dog.user, { onDelete: 'CASCADE' })
  dogs: Dog[];

  @OneToMany(() => Favorite, (favorite) => favorite.user, {
    onDelete: 'CASCADE',
  })
  favorites: Favorite[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
