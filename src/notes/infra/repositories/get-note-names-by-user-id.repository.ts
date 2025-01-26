import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Note } from "../schemas/notes/note.entity";

@Injectable()
export class GetNoteNamesByUserIdRepository {
  constructor(private readonly dataSource: DataSource) {}

  async apply(userId: string): Promise<string[]> {
    const notes = await this.dataSource
      .getRepository(Note)
      .createQueryBuilder("note")
      .select("note.name")
      .where("note.user_id = :userId", { userId })
      .getMany();

    return notes.map((note) => note.name);
  }
}
