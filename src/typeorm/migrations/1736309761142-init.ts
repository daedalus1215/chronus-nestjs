import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1736309761142 implements MigrationInterface {
    name = 'Init1736309761142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create main tables
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "user_id" integer, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "memos" ("id" SERIAL NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_5f005ade603ff6ea114dcacde0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "checklist_items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bae00945a1d4789bd648e583e29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "checklists" ("id" SERIAL NOT NULL, CONSTRAINT "PK_336ade2047f3d713e1afa20d2c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "archived_date" date NOT NULL, "memo_id" integer, "checklist_id" integer, CONSTRAINT "REL_2d85c0c4df4bdc951cdd0f9465" UNIQUE ("memo_id"), CONSTRAINT "REL_a142a608248254f31569914f79" UNIQUE ("checklist_id"), CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);

        // Create many-to-many join table with additional properties
        await queryRunner.query(`CREATE TABLE "checklists_checklistItems" (
            "checklist_id" integer NOT NULL,
            "checklist_item_id" integer NOT NULL,
            "done_date" date NOT NULL,
            "archived_date" date NOT NULL,
            CONSTRAINT "PK_eb01484918f17b9d730eb63e3c9" PRIMARY KEY ("checklist_id", "checklist_item_id")
        )`);

        // Create tag_notes join table with additional properties
        await queryRunner.query(`CREATE TABLE "tag_notes" (
            "id" SERIAL NOT NULL,
            "archived_date" date NOT NULL,
            "tag_id" integer,
            "notes_id" integer,
            CONSTRAINT "PK_64fec53360cf1ff0439ae71c7e5" PRIMARY KEY ("id")
        )`);

        // Add indexes to join tables for efficient lookups
        await queryRunner.query(`CREATE INDEX "IDX_a252955cde6890ec98e3b6be48" ON "checklists_checklistItems" ("checklist_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_46dc0e7b4af4c27094416409a6" ON "checklists_checklistItems" ("checklist_item_id")`);

        // Add foreign key constraints
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_74603743868d1e4f4fc2c0225b6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_2d85c0c4df4bdc951cdd0f94650" FOREIGN KEY ("memo_id") REFERENCES "memos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_a142a608248254f31569914f790" FOREIGN KEY ("checklist_id") REFERENCES "checklists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_notes" ADD CONSTRAINT "FK_2eae8872308f6e6997732458a2b" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_notes" ADD CONSTRAINT "FK_f74bd04a606f40e37991b74e125" FOREIGN KEY ("notes_id") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "FK_a252955cde6890ec98e3b6be48f" FOREIGN KEY ("checklist_id") REFERENCES "checklists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" ADD CONSTRAINT "FK_46dc0e7b4af4c27094416409a66" FOREIGN KEY ("checklist_item_id") REFERENCES "checklist_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP CONSTRAINT "FK_46dc0e7b4af4c27094416409a66"`);
        await queryRunner.query(`ALTER TABLE "checklists_checklistItems" DROP CONSTRAINT "FK_a252955cde6890ec98e3b6be48f"`);
        await queryRunner.query(`ALTER TABLE "tag_notes" DROP CONSTRAINT "FK_f74bd04a606f40e37991b74e125"`);
        await queryRunner.query(`ALTER TABLE "tag_notes" DROP CONSTRAINT "FK_2eae8872308f6e6997732458a2b"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_a142a608248254f31569914f790"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_2d85c0c4df4bdc951cdd0f94650"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_74603743868d1e4f4fc2c0225b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_46dc0e7b4af4c27094416409a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a252955cde6890ec98e3b6be48"`);
        await queryRunner.query(`DROP TABLE "tag_notes"`);
        await queryRunner.query(`DROP TABLE "checklists_checklistItems"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`DROP TABLE "checklists"`);
        await queryRunner.query(`DROP TABLE "checklist_items"`);
        await queryRunner.query(`DROP TABLE "memos"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }
}
