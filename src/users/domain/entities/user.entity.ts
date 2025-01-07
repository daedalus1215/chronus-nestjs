import { BaseEntity } from "src/domain/generic/entities/base.entity";
import { Note } from "src/notes/infra/schemas/notes/note.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @Column({ unique: true, length: 20 })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100 })
  email: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
