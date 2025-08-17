import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Events } from './events.entity';
import { Participants } from './participants.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @OneToMany(() => Events, (e) => e.user)
  event: Events[];

  @OneToMany(() => Participants, (p) => p.user)
  registration: Participants[];
}
