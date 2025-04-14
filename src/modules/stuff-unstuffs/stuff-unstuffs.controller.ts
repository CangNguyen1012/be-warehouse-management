import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StuffUnstuffsService } from './stuff-unstuffs.service';
import { CreateStuffUnstuffDto } from './dto/create-stuff-unstuff.dto';
import { UpdateStuffUnstuffDto } from './dto/update-stuff-unstuff.dto';

@ApiTags('stuff-unstuffs')
@Controller('stuff-unstuffs')
export class StuffUnstuffsController {
  constructor(private readonly stuffUnstuffsService: StuffUnstuffsService) {}

  @Post()
  @ApiOperation({ summary: 'Create stuff-unstuff' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiBody({ type: CreateStuffUnstuffDto })
  async create(@Body() createStuffUnstuffDto: CreateStuffUnstuffDto) {
    return await this.stuffUnstuffsService.createStuffUnstuff(
      createStuffUnstuffDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all stuff-unstuffs' })
  @ApiResponse({ status: 200, description: 'OK' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
  ) {
    return await this.stuffUnstuffsService.findAllStuffUnstuffs(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get stuff-unstuff by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findStuffUnstuffById(@Param('id') id: string) {
    return await this.stuffUnstuffsService.findStuffUnstuffById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update stuff-unstuff by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiBody({ type: UpdateStuffUnstuffDto })
  async updateStuffUnstuff(
    @Param('id') id: string,
    @Body() updateStuffUnstuffDto: UpdateStuffUnstuffDto,
  ) {
    return await this.stuffUnstuffsService.updateStuffUnstuff(
      id,
      updateStuffUnstuffDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete stuff-unstuff by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async deleteStuffUnstuff(@Param('id') id: string) {
    return await this.stuffUnstuffsService.deleteStuffUnstuff(id);
  }
}
