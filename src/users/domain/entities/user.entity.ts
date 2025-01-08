import { BaseEntity } from "src/domain/generic/entities/base.entity";
import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "text" })
  createdAt: string;

  @UpdateDateColumn({ type: "text" })
  updatedAt: string;

  @Column({ unique: true, length: 20 })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100 })
  email: string;
}
