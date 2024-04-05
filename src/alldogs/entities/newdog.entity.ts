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
export class NewDog {
  @PrimaryGeneratedColumn({ name: 'NewDogID' })
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
