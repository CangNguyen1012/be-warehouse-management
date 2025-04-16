import { Injectable } from '@nestjs/common';
import { TerminalRepository } from './repository/terminal.repository';
import { Terminal } from './schemas/terminal.schema';
import { UpdateTerminalDto } from './dto/update-terminal.dto';
import { CreateTerminalDto } from './dto/create-terminal.dto';

@Injectable()
export class TerminalService {
  constructor(private terminalRepository: TerminalRepository) {}

  async findAll() {
    const terminals = await this.terminalRepository.findAll();
    return {
      statusCode: 200,
      data: terminals,
      timestamp: new Date().toISOString(),
    };
  }

  async findById(id: string): Promise<Terminal | null> {
    return await this.terminalRepository.findById(id);
  }

  async create(createTerminalDto: CreateTerminalDto): Promise<Terminal> {
    return await this.terminalRepository.create(createTerminalDto);
  }

  async update(
    id: string,
    updateTerminalDto: UpdateTerminalDto,
  ): Promise<Terminal | null> {
    return await this.terminalRepository.update(id, updateTerminalDto);
  }
}
