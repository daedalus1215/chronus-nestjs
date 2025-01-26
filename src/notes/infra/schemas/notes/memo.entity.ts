import {
  Entity,
  Column,
  OneToOne,
} from "typeorm";
import { Note } from "./note.entity";
import { BaseEntity } from "src/shared-kernel/domain/generic/entities/base.entity";

@Entity("memos")
export class Memo extends BaseEntity {
  @Column("text")
  description: string;

  @OneToOne(() => Note, (note) => note.id, { onDelete: "CASCADE" })
  note: Note;
}
