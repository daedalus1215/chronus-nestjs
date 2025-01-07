import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tag } from './tag.entity';
import { Note } from '../notes/note.entity';

@Entity('tag_notes')
export class TagNote {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Tag)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  @ManyToOne(() => Note, note => note.id)
  @JoinColumn({ name: 'notes_id' })
  notes: Note;

  @Column('date')
  archived_date: Date;
}