import { MigrationInterface, QueryRunner } from "typeorm";

export class Alter_userTable_authenticationIdColumn1737838793360 implements MigrationInterface {
    name = 'Alter_userTable_authenticationIdColumn1737838793360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(100) NOT NULL, "authentication_id" varchar(100) NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "email", "authentication_id", "created_date", "updated_date") SELECT "id", "email", "authenticationId", "created_date", "updated_date" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(100) NOT NULL, "authenticationId" varchar(100) NOT NULL, "created_date" text NOT NULL DEFAULT (datetime('now')), "updated_date" text NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "users"("id", "email", "authenticationId", "created_date", "updated_date") SELECT "id", "email", "authentication_id", "created_date", "updated_date" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }
}
