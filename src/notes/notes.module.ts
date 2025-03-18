import { Note } from "./domain/entities/notes/note.entity";
import { Tag } from "./domain/entities/tag/tag.entity";
import { TagNote } from "./domain/entities/tag/tag-note.entity";
import { GetNoteNamesByUserIdRepository } from "./infra/repositories/get-note-names-by-user-id.repository";
import { getNoteNamesByUserIdAction } from "./apps/actions/get-note-names-by-userId.action";
import { Memo } from "./domain/entities/notes/memo.entity";
import { CreateNoteAction } from "./apps/actions/create-note.action";
import { CreateNoteTransactionScript } from "./domain/transaction-scripts/create-note.transaction.script";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([Note, Memo, Tag, TagNote])],
  controllers: [getNoteNamesByUserIdAction, CreateNoteAction],
  providers: [GetNoteNamesByUserIdRepository, CreateNoteTransactionScript],
})
export class NotesModule {}
