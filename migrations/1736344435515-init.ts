import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1736344435515 implements MigrationInterface {
    name = 'Init1736344435515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" text NOT NULL DEFAULT now(), "updatedAt" text NOT NULL DEFAULT now(), "username" character varying(20) NOT NULL, "password" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "base_entity" ("id" SERIAL NOT NULL, "createdAt" text NOT NULL DEFAULT now(), "updatedAt" text NOT NULL DEFAULT now(), CONSTRAINT "PK_03e6c58047b7a4b3f6de0bfa8d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "memos" ("id" SERIAL NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_5f005ade603ff6ea114dcacde0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "checklist_items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bae00945a1d4789bd648e583e29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "checklists" ("id" SERIAL NOT NULL, CONSTRAINT "PK_336ade2047f3d713e1afa20d2c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "archived_date" date NOT NULL, "memo_id" integer, "checklist_id" integer, CONSTRAINT "REL_2d85c0c4df4bdc951cdd0f9465" UNIQUE ("memo_id"), CONSTRAINT "REL_a142a608248254f31569914f79" UNIQUE ("checklist_id"), CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_notes" ("id" SERIAL NOT NULL, "archived_date" date NOT NULL, "tag_id" integer, "notes_id" integer, CONSTRAINT "PK_64fec53360cf1ff0439ae71c7e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "checklists_checklistItems" ("id" SERIAL NOT NULL, "done_date" date NOT NULL, "archived_date" date NOT NULL, "checklistId" integer, "checklistItemId" integer, CONSTRAINT "PK_6e57fd64befcbdcde1f1b17f813" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "PK_6e57fd64befcbdcde1f1b17f813" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD "done_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD "archived_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD "checklistId" integer`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD "checklistItemId" integer`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD "checklist_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "PK_913847a23c6b926952769be8205" PRIMARY KEY ("id", "checklist_id")`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD "checklist_item_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "PK_cc217f9ce7690fd405b350186c2" PRIMARY KEY ("id", "checklist_id", "checklist_item_id")`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "PK_eb01484918f17b9d730eb63e3c9" PRIMARY KEY ("checklist_id", "checklist_item_id")`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "PK_eb01484918f17b9d730eb63e3c9" PRIMARY KEY ("checklist_id", "checklist_item_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_a252955cde6890ec98e3b6be48" ON "checklists_checklistItems" ("checklist_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_46dc0e7b4af4c27094416409a6" ON "checklists_checklistItems" ("checklist_item_id") `);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_2d85c0c4df4bdc951cdd0f94650" FOREIGN KEY ("memo_id") REFERENCES "memos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_a142a608248254f31569914f790" FOREIGN KEY ("checklist_id") REFERENCES "checklists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_notes" ADD CONSTRAINT "FK_2eae8872308f6e6997732458a2b" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_notes" ADD CONSTRAINT "FK_f74bd04a606f40e37991b74e125" FOREIGN KEY ("notes_id") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "FK_7d2247c5d1affc579e0bc893c5e" FOREIGN KEY ("checklistId") REFERENCES "checklists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "FK_bf80ca0092be91100ff7b1c6d83" FOREIGN KEY ("checklistItemId") REFERENCES "checklist_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "FK_a252955cde6890ec98e3b6be48f" FOREIGN KEY ("checklist_id") REFERENCES "checklists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "FK_46dc0e7b4af4c27094416409a66" FOREIGN KEY ("checklist_item_id") REFERENCES "checklist_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP CONSTRAINT "FK_46dc0e7b4af4c27094416409a66"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP CONSTRAINT "FK_a252955cde6890ec98e3b6be48f"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP CONSTRAINT "FK_bf80ca0092be91100ff7b1c6d83"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP CONSTRAINT "FK_7d2247c5d1affc579e0bc893c5e"`);
        await queryRunner.query(`ALTER TABLE "tag_notes" DROP CONSTRAINT "FK_f74bd04a606f40e37991b74e125"`);
        await queryRunner.query(`ALTER TABLE "tag_notes" DROP CONSTRAINT "FK_2eae8872308f6e6997732458a2b"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_a142a608248254f31569914f790"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_2d85c0c4df4bdc951cdd0f94650"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_46dc0e7b4af4c27094416409a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a252955cde6890ec98e3b6be48"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP CONSTRAINT "PK_eb01484918f17b9d730eb63e3c9"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "PK_cc217f9ce7690fd405b350186c2" PRIMARY KEY ("id", "checklist_id", "checklist_item_id")`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP CONSTRAINT "PK_eb01484918f17b9d730eb63e3c9"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "PK_cc217f9ce7690fd405b350186c2" PRIMARY KEY ("id", "checklist_id", "checklist_item_id")`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP CONSTRAINT "PK_cc217f9ce7690fd405b350186c2"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "PK_913847a23c6b926952769be8205" PRIMARY KEY ("id", "checklist_id")`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP COLUMN "checklist_item_id"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP CONSTRAINT "PK_913847a23c6b926952769be8205"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "PK_6e57fd64befcbdcde1f1b17f813" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP COLUMN "checklist_id"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP COLUMN "checklistItemId"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP COLUMN "checklistId"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP COLUMN "archived_date"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP COLUMN "done_date"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP CONSTRAINT "PK_6e57fd64befcbdcde1f1b17f813"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD "checklistItemId" integer`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD "checklistId" integer`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD "archived_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD "done_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "PK_6e57fd64befcbdcde1f1b17f813" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "checklists_checklistItems"`);
        await queryRunner.query(`DROP TABLE "tag_notes"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`DROP TABLE "checklists"`);
        await queryRunner.query(`DROP TABLE "checklist_items"`);
        await queryRunner.query(`DROP TABLE "memos"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "base_entity"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
