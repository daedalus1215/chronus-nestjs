import { MigrationInterface, QueryRunner } from "typeorm";

export class Alter_memoTable_addDateColumns1737923933716 implements MigrationInterface {
    name = 'Alter_memoTable_addDateColumns1737923933716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime, "memo_id" integer, CONSTRAINT "UQ_571a925e7a956c24701f01af899" UNIQUE ("memo_id"), CONSTRAINT "FK_2d85c0c4df4bdc951cdd0f94650" FOREIGN KEY ("memo_id") REFERENCES "memos" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_notes"("id", "name", "user_id", "created_date", "updated_date", "date", "memo_id") SELECT "id", "name", "user_id", "created_date", "updated_date", "date", "memo_id" FROM "notes"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_notes" RENAME TO "notes"`);
        await queryRunner.query(`CREATE TABLE "temporary_memos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_memos"("id", "description") SELECT "id", "description" FROM "memos"`);
        await queryRunner.query(`DROP TABLE "memos"`);
        await queryRunner.query(`ALTER TABLE "temporary_memos" RENAME TO "memos"`);
        await queryRunner.query(`CREATE TABLE "temporary_notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime, "memo_id" integer, CONSTRAINT "UQ_571a925e7a956c24701f01af899" UNIQUE ("memo_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_notes"("id", "name", "user_id", "created_date", "updated_date", "date", "memo_id") SELECT "id", "name", "user_id", "created_date", "updated_date", "date", "memo_id" FROM "notes"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_notes" RENAME TO "notes"`);
        await queryRunner.query(`CREATE TABLE "temporary_memos" ("id" varchar PRIMARY KEY NOT NULL, "description" text NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_memos"("id", "description", "created_date", "updated_date") SELECT "id", "description", "created_date", "updated_date" FROM "memos"`);
        await queryRunner.query(`DROP TABLE "memos"`);
        await queryRunner.query(`ALTER TABLE "temporary_memos" RENAME TO "memos"`);
        await queryRunner.query(`CREATE TABLE "temporary_notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime, "memo_id" varchar, CONSTRAINT "UQ_571a925e7a956c24701f01af899" UNIQUE ("memo_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_notes"("id", "name", "user_id", "created_date", "updated_date", "date", "memo_id") SELECT "id", "name", "user_id", "created_date", "updated_date", "date", "memo_id" FROM "notes"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_notes" RENAME TO "notes"`);
        await queryRunner.query(`CREATE TABLE "temporary_notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime, "memo_id" varchar, CONSTRAINT "UQ_571a925e7a956c24701f01af899" UNIQUE ("memo_id"), CONSTRAINT "FK_2d85c0c4df4bdc951cdd0f94650" FOREIGN KEY ("memo_id") REFERENCES "memos" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_notes"("id", "name", "user_id", "created_date", "updated_date", "date", "memo_id") SELECT "id", "name", "user_id", "created_date", "updated_date", "date", "memo_id" FROM "notes"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_notes" RENAME TO "notes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" RENAME TO "temporary_notes"`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime, "memo_id" varchar, CONSTRAINT "UQ_571a925e7a956c24701f01af899" UNIQUE ("memo_id"))`);
        await queryRunner.query(`INSERT INTO "notes"("id", "name", "user_id", "created_date", "updated_date", "date", "memo_id") SELECT "id", "name", "user_id", "created_date", "updated_date", "date", "memo_id" FROM "temporary_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_notes"`);
        await queryRunner.query(`ALTER TABLE "notes" RENAME TO "temporary_notes"`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime, "memo_id" integer, CONSTRAINT "UQ_571a925e7a956c24701f01af899" UNIQUE ("memo_id"))`);
        await queryRunner.query(`INSERT INTO "notes"("id", "name", "user_id", "created_date", "updated_date", "date", "memo_id") SELECT "id", "name", "user_id", "created_date", "updated_date", "date", "memo_id" FROM "temporary_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_notes"`);
        await queryRunner.query(`ALTER TABLE "memos" RENAME TO "temporary_memos"`);
        await queryRunner.query(`CREATE TABLE "memos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "memos"("id", "description", "created_date", "updated_date") SELECT "id", "description", "created_date", "updated_date" FROM "temporary_memos"`);
        await queryRunner.query(`DROP TABLE "temporary_memos"`);
        await queryRunner.query(`ALTER TABLE "notes" RENAME TO "temporary_notes"`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime, "memo_id" integer, CONSTRAINT "UQ_571a925e7a956c24701f01af899" UNIQUE ("memo_id"), CONSTRAINT "FK_2d85c0c4df4bdc951cdd0f94650" FOREIGN KEY ("memo_id") REFERENCES "memos" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "notes"("id", "name", "user_id", "created_date", "updated_date", "date", "memo_id") SELECT "id", "name", "user_id", "created_date", "updated_date", "date", "memo_id" FROM "temporary_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_notes"`);
        await queryRunner.query(`ALTER TABLE "memos" RENAME TO "temporary_memos"`);
        await queryRunner.query(`CREATE TABLE "memos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "memos"("id", "description") SELECT "id", "description" FROM "temporary_memos"`);
        await queryRunner.query(`DROP TABLE "temporary_memos"`);
        await queryRunner.query(`ALTER TABLE "notes" RENAME TO "temporary_notes"`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime, "memo_id" integer, CONSTRAINT "UQ_571a925e7a956c24701f01af899" UNIQUE ("memo_id"), CONSTRAINT "FK_2d85c0c4df4bdc951cdd0f94650" FOREIGN KEY ("memo_id") REFERENCES "memos" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "notes"("id", "name", "user_id", "created_date", "updated_date", "date", "memo_id") SELECT "id", "name", "user_id", "created_date", "updated_date", "date", "memo_id" FROM "temporary_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_notes"`);
    }

}
