import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToOne,
} from "typeorm";
import { Memo } from "./memo.entity";
import { Checklist } from "./checklist/checklist.entity";
import { User } from "src/users/domain/entities/user.entity";
import { Tag } from "../tag/tag.entity";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Memo, { nullable: true })
  @JoinColumn({ name: "memo_id" })
  memo: Memo | null;

  @OneToOne(() => Checklist, { nullable: true })
  @JoinColumn({ name: "checklist_id" })
  checklist: Checklist | null;

  @ManyToMany(() => Tag, (tag) => tag.id)
  @JoinColumn({ name: "tag_id" })
  tags: Tag[] | null;

  @Column()
  name: string;

  user_id: string;

  @Column("date")
  archived_date: Date;
}
