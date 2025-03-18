import { Repository } from "typeorm";
import { Note } from "../../domain/entities/notes/note.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class GetNoteNamesByUserIdRepository {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>
  ) {}

  async apply(userId: string): Promise<string[]> {
    const notes = await this.noteRepository
      .createQueryBuilder("note")
      .select("note.name")
      .where("note.userId = :userId", { userId })
      .getRawMany();

    return notes.map((note) => note.name);
  }
}
