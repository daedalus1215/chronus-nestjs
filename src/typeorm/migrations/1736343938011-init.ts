import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1736344435515 implements MigrationInterface {
    name = 'Init1736344435515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" text NOT NULL DEFAULT now(), "updatedAt" text NOT NULL DEFAULT now(), "username" character varying(20) NOT NULL, "password" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
     
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
