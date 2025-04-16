import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTerminalDto } from './dto/create-terminal.dto';

@Controller('terminal')
export class TerminalController {
  constructor(private terminalService: TerminalService) {}

  @Post()
  @ApiOperation({ summary: 'Create terminal' })
  @ApiResponse({ status: 200, description: 'Terminal created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createTerminal(@Body() createTerminalDto: CreateTerminalDto) {
    return await this.terminalService.create(createTerminalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all terminals' })
  @ApiResponse({ status: 200, description: 'All terminals' })
  async getAllTerminals() {
    return await this.terminalService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get terminal by id' })
  @ApiResponse({ status: 200, description: 'Terminal found' })
  @ApiResponse({ status: 404, description: 'Terminal not found' })
  async getTerminalById(@Param() id: string) {
    return await this.terminalService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update terminal by id' })
  @ApiResponse({ status: 200, description: 'Terminal updated' })
  @ApiResponse({ status: 404, description: 'Terminal not found' })
  async updateTerminal(
    @Param() id: string,
    @Body() updateTerminalDto: CreateTerminalDto,
  ) {
    return await this.terminalService.update(id, updateTerminalDto);
  }
}
