import { MigrationInterface, QueryRunner } from "typeorm";

export class Create_note_table1737604230587 implements MigrationInterface {
    name = 'Create_note_table1737604230587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "user_id" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "user_id" varchar NOT NULL, "archived_date" date NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
