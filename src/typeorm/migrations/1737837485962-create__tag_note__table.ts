import { MigrationInterface, QueryRunner } from "typeorm";

export class Create_tagNote_table1737837485962 implements MigrationInterface {
    name = 'Create_tagNote_table1737837485962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag_notes" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "archived_date" date NOT NULL, "tag_id" integer, "notes_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_tag_notes" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "archived_date" date NOT NULL, "tag_id" integer, "notes_id" varchar, CONSTRAINT "FK_2eae8872308f6e6997732458a2b" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_f74bd04a606f40e37991b74e125" FOREIGN KEY ("notes_id") REFERENCES "notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tag_notes"("id", "createdAt", "updatedAt", "archived_date", "tag_id", "notes_id") SELECT "id", "createdAt", "updatedAt", "archived_date", "tag_id", "notes_id" FROM "tag_notes"`);
        await queryRunner.query(`DROP TABLE "tag_notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_tag_notes" RENAME TO "tag_notes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_notes" RENAME TO "temporary_tag_notes"`);
        await queryRunner.query(`CREATE TABLE "tag_notes" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "archived_date" date NOT NULL, "tag_id" integer, "notes_id" varchar)`);
        await queryRunner.query(`INSERT INTO "tag_notes"("id", "createdAt", "updatedAt", "archived_date", "tag_id", "notes_id") SELECT "id", "createdAt", "updatedAt", "archived_date", "tag_id", "notes_id" FROM "temporary_tag_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_tag_notes"`);
        await queryRunner.query(`DROP TABLE "tag_notes"`);
    }

}
