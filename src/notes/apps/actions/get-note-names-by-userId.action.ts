import { Controller, Get, Param } from '@nestjs/common';
import { GetNoteNamesByUserIdRepository } from 'src/notes/infra/repositories/get-note-names-by-user-id.repository';

@Controller('notes')
export class getNoteNamesByUserIdAction {
  constructor(private readonly getNoteNamesByUserIdRepository:GetNoteNamesByUserIdRepository) {}

  @Get(':userId/names')
  async apply(@Param('userId') userId: string): Promise<string[]> {
    return this.getNoteNamesByUserIdRepository.apply(userId);
  }
}
