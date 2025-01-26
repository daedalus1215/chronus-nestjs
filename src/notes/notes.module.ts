// notes/notes.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Note } from "./infra/entities/notes/note.entity";
// import { Checklist } from "./infra/schemas/notes/checklist/checklist.entity";
// import { ChecklistItem } from "./infra/schemas/notes/checklist/checklistitem.entity";
// import { ChecklistChecklistItem } from "./infra/schemas/notes/checklist/checklists-checklistitems.entity";
// import { Memo } from "./infra/schemas/notes/memo.entity";
import { Tag } from "./infra/entities/tag/tag.entity";
import { TagNote } from "./infra/entities/tag/tag-note.entity";
import { GetNoteNamesByUserIdRepository } from "./infra/repositories/get-note-names-by-user-id.repository";
import { getNoteNamesByUserIdAction } from "./apps/actions/get-note-names-by-userId.action";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Checklist,
      // ChecklistItem,
      // ChecklistChecklistItem,
      Note,
      // Memo,
      Tag,
      TagNote,
    ]),
  ],
  controllers: [getNoteNamesByUserIdAction],
  providers: [GetNoteNamesByUserIdRepository],
})
export class NotesModule {}
