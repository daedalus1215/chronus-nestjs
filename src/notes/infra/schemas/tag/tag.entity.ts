import { User } from 'src/users/domain/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({name: 'user_id'})
  userId: string;
}