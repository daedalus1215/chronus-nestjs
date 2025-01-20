import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Entity } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn({ type: 'text' })  // Use 'text' for SQLite compatibility
  createdAt: string;

  @UpdateDateColumn({ type: 'text' })  // Use 'text' for SQLite compatibility
  updatedAt: string;
}
