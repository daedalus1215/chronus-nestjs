import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Note } from './note.entity';

@Entity('memos')
export class Memo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  description: string;


  @OneToMany(() => Note, (note) => note.memo)
  notes: Note[];
}