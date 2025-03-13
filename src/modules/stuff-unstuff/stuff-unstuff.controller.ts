import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStuffUnstuffDto } from './dto/create-stuff-unstuff.dto';
import { UpdateStuffUnstuffDto } from './dto/update-stuff-unstuff.dto';
import { StuffUnstuffService } from './stuff-unstuff.service';

@ApiTags('stuff-unstuff')
@Controller('stuff-unstuff')
export class StuffUnstuffController {
  constructor(private readonly stuffUnstuffService: StuffUnstuffService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new stuff unstuff record' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  async create(@Body() createDto: CreateStuffUnstuffDto) {
    const data = await this.stuffUnstuffService.createStuffUnstuff(createDto);
    return {
      statusCode: 201,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Retrieve all stuff unstuff records' })
  @ApiResponse({ status: 200, description: 'Records retrieved successfully' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 22) {
    const data = await this.stuffUnstuffService.findAllStuffUnstuffs(
      page,
      limit,
    );
    return {
      statusCode: 200,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Retrieve a specific stuff unstuff record' })
  @ApiResponse({ status: 200, description: 'Record found' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  async findById(@Param('id') id: string) {
    const data = await this.stuffUnstuffService.findByIdStuffUnstuff(id);
    if (!data) throw new NotFoundException('StuffUnstuff record not found');
    return {
      statusCode: 200,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a stuff unstuff record' })
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateStuffUnstuffDto,
  ) {
    const data = await this.stuffUnstuffService.updateStuffUnstuff(
      id,
      updateDto,
    );
    if (!data) throw new NotFoundException('StuffUnstuff record not found');
    return {
      statusCode: 200,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete a stuff unstuff record' })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  async delete(@Param('id') id: string) {
    const data = await this.stuffUnstuffService.deleteStuffUnstuff(id);
    if (!data) throw new NotFoundException('StuffUnstuff record not found');
    return {
      statusCode: 200,
      data,
      timestamp: new Date().toISOString(),
    };
  }
}
