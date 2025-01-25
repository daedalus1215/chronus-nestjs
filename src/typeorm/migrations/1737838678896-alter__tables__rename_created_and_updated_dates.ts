import { MigrationInterface, QueryRunner } from "typeorm";

export class Alter_tables_renameCreatedAndUpdatedDates1737838678896 implements MigrationInterface {
    name = 'Alter_tables_renameCreatedAndUpdatedDates1737838678896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(100) NOT NULL, "authenticationId" varchar(100) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "email", "authenticationId") SELECT "id", "email", "authenticationId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_notes"("id", "name", "user_id") SELECT "id", "name", "user_id" FROM "notes"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_notes" RENAME TO "notes"`);
        await queryRunner.query(`CREATE TABLE "temporary_tag_notes" ("id" varchar PRIMARY KEY NOT NULL, "archived_date" date NOT NULL, "tag_id" integer, "notes_id" varchar, CONSTRAINT "FK_f74bd04a606f40e37991b74e125" FOREIGN KEY ("notes_id") REFERENCES "notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_2eae8872308f6e6997732458a2b" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tag_notes"("id", "archived_date", "tag_id", "notes_id") SELECT "id", "archived_date", "tag_id", "notes_id" FROM "tag_notes"`);
        await queryRunner.query(`DROP TABLE "tag_notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_tag_notes" RENAME TO "tag_notes"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(100) NOT NULL, "authenticationId" varchar(100) NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "email", "authenticationId") SELECT "id", "email", "authenticationId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), "date" datetime)`);
        await queryRunner.query(`INSERT INTO "temporary_notes"("id", "name", "user_id") SELECT "id", "name", "user_id" FROM "notes"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_notes" RENAME TO "notes"`);
        await queryRunner.query(`CREATE TABLE "temporary_tag_notes" ("id" varchar PRIMARY KEY NOT NULL, "archived_date" date NOT NULL, "tag_id" integer, "notes_id" varchar, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_f74bd04a606f40e37991b74e125" FOREIGN KEY ("notes_id") REFERENCES "notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_2eae8872308f6e6997732458a2b" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tag_notes"("id", "archived_date", "tag_id", "notes_id") SELECT "id", "archived_date", "tag_id", "notes_id" FROM "tag_notes"`);
        await queryRunner.query(`DROP TABLE "tag_notes"`);
        await queryRunner.query(`ALTER TABLE "temporary_tag_notes" RENAME TO "tag_notes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_notes" RENAME TO "temporary_tag_notes"`);
        await queryRunner.query(`CREATE TABLE "tag_notes" ("id" varchar PRIMARY KEY NOT NULL, "archived_date" date NOT NULL, "tag_id" integer, "notes_id" varchar, CONSTRAINT "FK_f74bd04a606f40e37991b74e125" FOREIGN KEY ("notes_id") REFERENCES "notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_2eae8872308f6e6997732458a2b" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "tag_notes"("id", "archived_date", "tag_id", "notes_id") SELECT "id", "archived_date", "tag_id", "notes_id" FROM "temporary_tag_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_tag_notes"`);
        await queryRunner.query(`ALTER TABLE "notes" RENAME TO "temporary_notes"`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "user_id" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "notes"("id", "name", "user_id") SELECT "id", "name", "user_id" FROM "temporary_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_notes"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(100) NOT NULL, "authenticationId" varchar(100) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "email", "authenticationId") SELECT "id", "email", "authenticationId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "tag_notes" RENAME TO "temporary_tag_notes"`);
        await queryRunner.query(`CREATE TABLE "tag_notes" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "archived_date" date NOT NULL, "tag_id" integer, "notes_id" varchar, CONSTRAINT "FK_f74bd04a606f40e37991b74e125" FOREIGN KEY ("notes_id") REFERENCES "notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_2eae8872308f6e6997732458a2b" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "tag_notes"("id", "archived_date", "tag_id", "notes_id") SELECT "id", "archived_date", "tag_id", "notes_id" FROM "temporary_tag_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_tag_notes"`);
        await queryRunner.query(`ALTER TABLE "notes" RENAME TO "temporary_notes"`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "user_id" varchar NOT NULL, "archived_date" date NOT NULL)`);
        await queryRunner.query(`INSERT INTO "notes"("id", "name", "user_id") SELECT "id", "name", "user_id" FROM "temporary_notes"`);
        await queryRunner.query(`DROP TABLE "temporary_notes"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "email" varchar(100) NOT NULL, "authenticationId" varchar(100) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "email", "authenticationId") SELECT "id", "email", "authenticationId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
