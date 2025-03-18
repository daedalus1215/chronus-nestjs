// src/notes/apps/actions/update-note.action.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "../entities/notes/note.entity";
import { Repository } from "typeorm";
import { Tag } from "src/notes/domain/entities/tag/tag.entity";
import { UpdateNoteDto } from "src/notes/apps/dtos/requests/update-note.dto";

@Injectable()
export class UpdateNoteTransactionScript {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>
  ) {}

  async apply(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    let note = await this.notesRepository.findOne({
      where: { id },
      relations: ["tags"],
    });

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    if (updateNoteDto.name !== undefined) {
      note.name = updateNoteDto.name;
    }

    if (updateNoteDto.description !== undefined) {
      note.memo.description = updateNoteDto.description;
    }

    if (updateNoteDto.tags) {
      const existingTags = note.tags.map((tag) => tag.name);

      const newTags = updateNoteDto.tags.filter(
        (tag) => !existingTags.includes(tag)
      );
      const tagsToRemove = existingTags.filter(
        (tag) => !updateNoteDto.tags.includes(tag)
      );

      await this.removeTags(tagsToRemove, note);

      await this.addTags(newTags, note);
    }

    return this.notesRepository.save(note);
  }

  private async addTags(newTags: string[], note: Note) {
    for (const tagName of newTags) {
      let tag = await this.tagsRepository.findOne({ where: { name: tagName } });
      if (!tag) {
        tag = this.tagsRepository.create({ name: tagName });
        await this.tagsRepository.save(tag);
      }
      note.tags.push(tag);
    }
  }

  private async removeTags(tagsToRemove: string[], note: Note) {
    for (const tagName of tagsToRemove) {
      const tagToRemove = note.tags.find((tag) => tag.name === tagName);
      if (tagToRemove) {
        note.tags = note.tags.filter((tag) => tag !== tagToRemove);
        await this.tagsRepository.remove(tagToRemove);
      }
    }
  }
}
