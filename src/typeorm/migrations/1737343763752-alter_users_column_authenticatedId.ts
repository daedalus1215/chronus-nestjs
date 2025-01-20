import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUsersColumnAuthenticatedId1737343763752 implements MigrationInterface {
    name = 'AlterUsersColumnAuthenticatedId1737343763752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "email" varchar(100) NOT NULL, "authenticationId" varchar(100) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "createdAt", "updatedAt", "email") SELECT "id", "createdAt", "updatedAt", "email" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "email" varchar(100) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "createdAt", "updatedAt", "email") SELECT "id", "createdAt", "updatedAt", "email" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
