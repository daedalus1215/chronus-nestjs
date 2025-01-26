import { MigrationInterface, QueryRunner } from "typeorm";

export class Create_noteTagsTable1737924262005 implements MigrationInterface {
    name = 'Create_noteTagsTable1737924262005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note_tags" ("note_id" varchar NOT NULL, "tag_id" integer NOT NULL, PRIMARY KEY ("note_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6fa35b8ead30ef28cc1ac377b2" ON "note_tags" ("note_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_898115de9eadba996d4323ff0b" ON "note_tags" ("tag_id") `);
        await queryRunner.query(`DROP INDEX "IDX_6fa35b8ead30ef28cc1ac377b2"`);
        await queryRunner.query(`DROP INDEX "IDX_898115de9eadba996d4323ff0b"`);
        await queryRunner.query(`CREATE TABLE "temporary_note_tags" ("note_id" varchar NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "FK_6fa35b8ead30ef28cc1ac377b21" FOREIGN KEY ("note_id") REFERENCES "notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_898115de9eadba996d4323ff0b6" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("note_id", "tag_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_note_tags"("note_id", "tag_id") SELECT "note_id", "tag_id" FROM "note_tags"`);
        await queryRunner.query(`DROP TABLE "note_tags"`);
        await queryRunner.query(`ALTER TABLE "temporary_note_tags" RENAME TO "note_tags"`);
        await queryRunner.query(`CREATE INDEX "IDX_6fa35b8ead30ef28cc1ac377b2" ON "note_tags" ("note_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_898115de9eadba996d4323ff0b" ON "note_tags" ("tag_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_898115de9eadba996d4323ff0b"`);
        await queryRunner.query(`DROP INDEX "IDX_6fa35b8ead30ef28cc1ac377b2"`);
        await queryRunner.query(`ALTER TABLE "note_tags" RENAME TO "temporary_note_tags"`);
        await queryRunner.query(`CREATE TABLE "note_tags" ("note_id" varchar NOT NULL, "tag_id" integer NOT NULL, PRIMARY KEY ("note_id", "tag_id"))`);
        await queryRunner.query(`INSERT INTO "note_tags"("note_id", "tag_id") SELECT "note_id", "tag_id" FROM "temporary_note_tags"`);
        await queryRunner.query(`DROP TABLE "temporary_note_tags"`);
        await queryRunner.query(`CREATE INDEX "IDX_898115de9eadba996d4323ff0b" ON "note_tags" ("tag_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6fa35b8ead30ef28cc1ac377b2" ON "note_tags" ("note_id") `);
        await queryRunner.query(`DROP INDEX "IDX_898115de9eadba996d4323ff0b"`);
        await queryRunner.query(`DROP INDEX "IDX_6fa35b8ead30ef28cc1ac377b2"`);
        await queryRunner.query(`DROP TABLE "note_tags"`);
    }

}
