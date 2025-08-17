import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Events } from './events.entity';

@Entity()
export class Participants {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (u) => u.registration)
  user: Users;

  @ManyToOne(() => Events, (e) => e.registration)
  event: Events;
}
