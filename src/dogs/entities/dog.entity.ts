import { Favorite } from 'src/favorites/entities/favorite.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Dog {
  @PrimaryGeneratedColumn({ name: 'DogID' })
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.dogs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Favorite, (favorite) => favorite.dog, {
    onDelete: 'CASCADE',
  })
  favorites: Favorite[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
