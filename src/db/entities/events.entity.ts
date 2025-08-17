import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Participants } from './participants.entity';
import { Users } from './users.entity';

@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  location: string;

  @Column()
  maxParticipants: number;

  @ManyToOne(() => Users, (u) => u.event)
  user: Users;

  @OneToMany(() => Participants, (p) => p.event)
  registration: Participants[];
}
