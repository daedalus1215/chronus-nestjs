import { MigrationInterface, QueryRunner } from "typeorm";

export class Alter_memoTable_referenceToNote1737923763981 implements MigrationInterface {
    name = 'Alter_memoTable_referenceToNote1737923763981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_tag_notes" ("id" varchar PRIMARY KEY NOT NULL, "archived_date" date NOT NULL, "tag_id" integer, "notes_id" varchar, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_2eae8872308f6e6997732458a2b" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tag_notes"("id", "archived_date", "tag_id", "notes_id", "created_date", "updated_date") SELECT "id", "archived_date", "tag_id", "notes_id", "created_date", "updated_date" FROM "tag_notes"`);
        await queryRunner.query(`DROP TABLE "tag_notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_tag_notes" RENAME TO "tag_notes"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(100) NOT NULL, "authentication_id" varchar(100) NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "email", "authentication_id", "created_date", "updated_date") SELECT "id", "email", "authenticationId", "created_date", "updated_date" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime, "memo_id" integer, CONSTRAINT "UQ_571a925e7a956c24701f01af899" UNIQUE ("memo_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_notes"("id", "name", "user_id", "created_date", "updated_date", "date") SELECT "id", "name", "user_id", "created_date", "updated_date", "date" FROM "notes"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_notes" RENAME TO "notes"`);
        await queryRunner.query(`CREATE TABLE "temporary_notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime, "memo_id" integer, CONSTRAINT "UQ_571a925e7a956c24701f01af899" UNIQUE ("memo_id"), CONSTRAINT "FK_2d85c0c4df4bdc951cdd0f94650" FOREIGN KEY ("memo_id") REFERENCES "memos" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_notes"("id", "name", "user_id", "created_date", "updated_date", "date", "memo_id") SELECT "id", "name", "user_id", "created_date", "updated_date", "date", "memo_id" FROM "notes"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_notes" RENAME TO "notes"`);
        await queryRunner.query(`CREATE TABLE "temporary_tag_notes" ("id" varchar PRIMARY KEY NOT NULL, "archived_date" date NOT NULL, "tag_id" integer, "notes_id" varchar, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_2eae8872308f6e6997732458a2b" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_f74bd04a606f40e37991b74e125" FOREIGN KEY ("notes_id") REFERENCES "notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tag_notes"("id", "archived_date", "tag_id", "notes_id", "created_date", "updated_date") SELECT "id", "archived_date", "tag_id", "notes_id", "created_date", "updated_date" FROM "tag_notes"`);
        await queryRunner.query(`DROP TABLE "tag_notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_tag_notes" RENAME TO "tag_notes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_notes" RENAME TO "temporary_tag_notes"`);
        await queryRunner.query(`CREATE TABLE "tag_notes" ("id" varchar PRIMARY KEY NOT NULL, "archived_date" date NOT NULL, "tag_id" integer, "notes_id" varchar, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_2eae8872308f6e6997732458a2b" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "tag_notes"("id", "archived_date", "tag_id", "notes_id", "created_date", "updated_date") SELECT "id", "archived_date", "tag_id", "notes_id", "created_date", "updated_date" FROM "temporary_tag_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_tag_notes"`);
        await queryRunner.query(`ALTER TABLE "notes" RENAME TO "temporary_notes"`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime, "memo_id" integer, CONSTRAINT "UQ_571a925e7a956c24701f01af899" UNIQUE ("memo_id"))`);
        await queryRunner.query(`INSERT INTO "notes"("id", "name", "user_id", "created_date", "updated_date", "date", "memo_id") SELECT "id", "name", "user_id", "created_date", "updated_date", "date", "memo_id" FROM "temporary_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_notes"`);
        await queryRunner.query(`ALTER TABLE "notes" RENAME TO "temporary_notes"`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime)`);
        await queryRunner.query(`INSERT INTO "notes"("id", "name", "user_id", "created_date", "updated_date", "date") SELECT "id", "name", "user_id", "created_date", "updated_date", "date" FROM "temporary_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_notes"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(100) NOT NULL, "authenticationId" varchar(100) NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "users"("id", "email", "authenticationId", "created_date", "updated_date") SELECT "id", "email", "authentication_id", "created_date", "updated_date" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "tag_notes" RENAME TO "temporary_tag_notes"`);
        await queryRunner.query(`CREATE TABLE "tag_notes" ("id" varchar PRIMARY KEY NOT NULL, "archived_date" date NOT NULL, "tag_id" integer, "notes_id" varchar, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_2eae8872308f6e6997732458a2b" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_f74bd04a606f40e37991b74e125" FOREIGN KEY ("notes_id") REFERENCES "temporary_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "tag_notes"("id", "archived_date", "tag_id", "notes_id", "created_date", "updated_date") SELECT "id", "archived_date", "tag_id", "notes_id", "created_date", "updated_date" FROM "temporary_tag_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_tag_notes"`);
    }

}
