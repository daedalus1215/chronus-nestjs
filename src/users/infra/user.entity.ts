import { BaseEntity } from 'src/domain/generic/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true, length: 20 })
  username: string;

  @Column({ length: 100 })
  password: string;
}
