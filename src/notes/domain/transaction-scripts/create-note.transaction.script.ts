import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateNoteDto } from "src/notes/apps/dtos/create-note.dto";
import { Memo } from "src/notes/infra/entities/notes/memo.entity";
import { Note } from "src/notes/infra/entities/notes/note.entity";
import { Repository } from "typeorm";

@Injectable()
export class CreateNoteTransactionScript {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>
    // @InjectRepository(Checklist)
    // private checklistsRepository: Repository<Checklist>
  ) {}

  async apply(createNoteDto: CreateNoteDto): Promise<Note> {
    const { name, userId, isMemo } = createNoteDto;

    const note = new Note();
    note.name = name;
    note.userId = userId;

    if (isMemo) {
      const memo = new Memo();
      note.memo = memo;
    }else {
        throw Error("Checklist not implemented yet");
    }

    return this.notesRepository.save(note);
  }
}
