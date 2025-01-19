import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateInitialTables1682045600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create memos table
    await queryRunner.createTable(
      new Table({
        name: "memos",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "description", type: "text", isNullable: false },
        ],
        uniques: [
          { name: "UQ_memos_id", columnNames: ["id"] },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "notes",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "name", type: "varchar", isNullable: false },
          { name: "memo_id", type: "uuid", isNullable: true },
          { name: "checklist_id", type: "uuid", isNullable: true },
          { name: "user_id", type: "uuid", isNullable: false },
          { name: "archived_date", type: "date", isNullable: false },
        ],
        uniques: [
          { name: "UQ_notes_id", columnNames: ["id"] },
        ],
      }),
    );

    // Create checklists table
    await queryRunner.createTable(
      new Table({
        name: "checklists",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
        ],
        uniques: [
          { name: "UQ_checklists_id", columnNames: ["id"] },
        ],
      }),
    );

    // Create checklist_items table
    await queryRunner.createTable(
      new Table({
        name: "checklist_items",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "name", type: "varchar", isNullable: false },
        ],
        uniques: [
          { name: "UQ_checklist_items_id", columnNames: ["id"] },
        ],
      }),
    );

    // Create checklists_checklistItems join table
    await queryRunner.createTable(
      new Table({
        name: "checklists_checklistItems",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "checklist_id", type: "uuid", isNullable: false },
          { name: "checklist_item_id", type: "uuid", isNullable: false },
          { name: "done_date", type: "date", isNullable: false },
          { name: "archived_date", type: "date", isNullable: false },
        ],
        uniques: [
          { name: "UQ_checklists_checklistItems_id", columnNames: ["id"] },
        ],
      }),
    );

    // Create foreign keys for notes table
    await queryRunner.createForeignKeys("notes", [
      new TableForeignKey({
        name: "FK_notes_memo_id",
        columnNames: ["memo_id"],
        referencedTableName: "memos",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
      new TableForeignKey({
        name: "FK_notes_checklist_id",
        columnNames: ["checklist_id"],
        referencedTableName: "checklists",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
    ]);

    // Create foreign keys for checklists_checklistItems table
    await queryRunner.createForeignKeys("checklists_checklistItems", [
      new TableForeignKey({
        name: "FK_checklists_checklistItems_checklist_id",
        columnNames: ["checklist_id"],
        referencedTableName: "checklists",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        name: "FK_checklists_checklistItems_checklist_item_id",
        columnNames: ["checklist_item_id"],
        referencedTableName: "checklist_items",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    ]);

    // Create indexes
    await queryRunner.createIndex(
      "notes",
      new TableIndex({
        name: "IDX_NOTES_USER_ID",
        columnNames: ["user_id"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.dropIndex("notes", "IDX_NOTES_USER_ID");
    await queryRunner.dropForeignKey("checklists_checklistItems", "FK_checklists_checklistItems_checklist_id");
    await queryRunner.dropForeignKey("checklists_checklistItems", "FK_checklists_checklistItems_checklist_item_id");
    await queryRunner.dropForeignKey("notes", "FK_notes_memo_id");
    await queryRunner.dropForeignKey("notes", "FK_notes_checklist_id");
    await queryRunner.dropTable("checklists_checklistItems");
    await queryRunner.dropTable("checklist_items");
    await queryRunner.dropTable("checklists");
    await queryRunner.dropTable("notes");
    await queryRunner.dropTable("memos");
  }
}
