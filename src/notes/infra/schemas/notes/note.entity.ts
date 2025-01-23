import { BaseEntity } from "src/shared-kernel/domain/generic/entities/base.entity";
import {
  Entity,
  Column,
  // PrimaryGeneratedColumn,
  // JoinColumn,
  // ManyToMany,
  // OneToOne,
} from "typeorm";
// import { Memo } from "./memo.entity";
// import { Checklist } from "./checklist/checklist.entity";
// import { Tag } from "../tag/tag.entity";

@Entity("notes")
export class Note extends BaseEntity {

  // @OneToOne(() => Memo, { nullable: true })
  // @JoinColumn({ name: "memo_id" })
  // memo: Memo | null;

  // @OneToOne(() => Checklist, { nullable: true })
  // @JoinColumn({ name: "checklist_id" })
  // checklist: Checklist | null;

  // @ManyToMany(() => Tag, (tag) => tag.id)
  // @JoinColumn({ name: "tag_id" })
  // tags: Tag[] | null;

  @Column()
  name: string;

  @Column({name: 'user_id'})
  userId: string;

  @Column('date')
  archived_date: Date;
}
