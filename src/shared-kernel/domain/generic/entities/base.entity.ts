import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Entity } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn({ type: 'text', name: 'created_date' })  // Use 'text' for SQLite compatibility
  createdAt: string;

  @UpdateDateColumn({ type: 'text', name: 'updated_date' })  // Use 'text' for SQLite compatibility
  updatedAt: string;
}
