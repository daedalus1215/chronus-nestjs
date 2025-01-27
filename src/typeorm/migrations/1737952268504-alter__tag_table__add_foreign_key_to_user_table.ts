import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class Alter__TagTable__AddForeginKeyToUserTable__1737952268504 implements MigrationInterface {
  name = "Alter__TagTable__AddForeginKeyToUserTable__1737952268504";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey("tags", new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE"
    }));
}

public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("tags");
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
    if (foreignKey) {
        await queryRunner.dropForeignKey("tags", foreignKey);
    }
}
}
