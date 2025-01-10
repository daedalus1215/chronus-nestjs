// notes/notes.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Checklist } from "./infra/schemas/notes/checklist/checklist.entity";
import { ChecklistItem } from "./infra/schemas/notes/checklist/checklistitem.entity";
import { ChecklistChecklistItem } from "./infra/schemas/notes/checklist/checklists-checklistitems.entity";
import { Note } from "./infra/schemas/notes/note.entity";
import { Memo } from "./infra/schemas/notes/memo.entity";
import { Tag } from "./infra/schemas/tag/tag.entity";
import { TagNote } from "./infra/schemas/tag/tag-note.entity";
import { GetNoteNamesByUserIdRepository } from "./infra/repositories/get-note-names-by-user-id.repository";
import { getNoteNamesByUserIdAction } from "./apps/actions/get-note-names-by-userId.action";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Checklist,
      ChecklistItem,
      ChecklistChecklistItem,
      Note,
      Memo,
      Tag,
      TagNote,
    ]),
  ],
  controllers: [getNoteNamesByUserIdAction],
  providers: [GetNoteNamesByUserIdRepository],
})
export class NotesModule {}
