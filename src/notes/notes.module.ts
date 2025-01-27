import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Note } from "./infra/entities/notes/note.entity";
import { Tag } from "./infra/entities/tag/tag.entity";
import { TagNote } from "./infra/entities/tag/tag-note.entity";
import { GetNoteNamesByUserIdRepository } from "./infra/repositories/get-note-names-by-user-id.repository";
import { getNoteNamesByUserIdAction } from "./apps/actions/get-note-names-by-userId.action";
import { Memo } from "./infra/entities/notes/memo.entity";
import { CreateNoteAction } from "./apps/actions/create-note.action";
import { CreateNoteTransactionScript } from "./domain/notes/transaction-scripts/create-note.transaction.script";

@Module({
  imports: [TypeOrmModule.forFeature([Note, Memo, Tag, TagNote])],
  controllers: [getNoteNamesByUserIdAction, CreateNoteAction],
  providers: [GetNoteNamesByUserIdRepository, CreateNoteTransactionScript],
})
export class NotesModule {}
