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

@Module({
  imports: [TypeOrmModule.forFeature([Checklist,ChecklistItem, ChecklistChecklistItem, Note, Memo, Tag, TagNote])],
})
export class NotesModule {}
