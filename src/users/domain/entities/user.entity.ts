import { BaseEntity } from "src/shared-kernel/domain/generic/entities/base.entity";
import {
  Entity,
  Column,
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  authenticationId: string;
}