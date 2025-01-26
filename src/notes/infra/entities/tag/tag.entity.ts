import { User } from 'src/users/domain/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Note } from '../notes/note.entity';

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


  @ManyToMany(() => Note, (note) => note.tags)
  notes: Note[];
}