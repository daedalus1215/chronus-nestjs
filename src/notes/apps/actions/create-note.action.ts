import { Controller, Post, Body } from '@nestjs/common';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateNoteTransactionScript } from 'src/notes/domain/notes/transaction-scripts/create-note.transaction.script';

@ApiTags('Notes')
@Controller('notes')
export class CreateNoteAction {
  constructor(readonly createNoteTransactionScript: CreateNoteTransactionScript) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({ status: 201, description: 'The note has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.createNoteTransactionScript.apply(createNoteDto);
  }
}