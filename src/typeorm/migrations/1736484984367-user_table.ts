import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1736484984367 implements MigrationInterface {
    name = 'UserTable1736484984367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_NOTES_USER_ID"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" text NOT NULL DEFAULT now(), "updatedAt" text NOT NULL DEFAULT now(), "username" character varying(20) NOT NULL, "password" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`CREATE INDEX "IDX_NOTES_USER_ID" ON "notes" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "FK_checklists_checklistItems_checklist_item_id" FOREIGN KEY ("checklist_item_id") REFERENCES "checklist_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "FK_checklists_checklistItems_checklist_id" FOREIGN KEY ("checklist_id") REFERENCES "checklists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_notes_checklist_id" FOREIGN KEY ("checklist_id") REFERENCES "checklists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_notes_memo_id" FOREIGN KEY ("memo_id") REFERENCES "memos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
