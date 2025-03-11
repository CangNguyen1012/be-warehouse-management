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
import { StuffUnstuffService } from './stuff-unstuff.service';
import { UpdateStuffUnstuffDto } from './dto/update-stuff-unstuff.dto';

@ApiTags('stuff-unstuff')
@Controller('stuff-unstuff')
export class StuffUnstuffController {
  constructor(private readonly stuffUnstuffService: StuffUnstuffService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create stuff unstuff' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  async create(@Body() createStuffUnstuffDto: CreateStuffUnstuffDto) {
    return {
      statusCode: 201,
      data: await this.stuffUnstuffService.createStuffUnstuff(
        createStuffUnstuffDto,
      ),
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Find all stuff unstuff' })
  @ApiResponse({ status: 200, description: 'Found successfully' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 22) {
    return {
      statusCode: 200,
      data: await this.stuffUnstuffService.findAllStuffUnstuffs(page, limit),
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find one stuff unstuff' })
  @ApiResponse({ status: 200, description: 'Found successfully' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findById(@Param('id') id: string) {
    const item = await this.stuffUnstuffService.findByIdStuffUnstuff(id);
    if (!item) {
      throw new NotFoundException('StuffUnstuff not found');
    }
    return {
      statusCode: 200,
      data: item,
      timestamp: new Date().toISOString(),
    };
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update stuff unstuff' })
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @Param('id') id: string,
    @Body() updateStuffUnstuffDto: UpdateStuffUnstuffDto,
  ) {
    const updatedItem = await this.stuffUnstuffService.updateStuffUnstuff(
      id,
      updateStuffUnstuffDto,
    );
    if (!updatedItem) {
      throw new NotFoundException('StuffUnstuff not found');
    }
    return {
      statusCode: 200,
      data: updatedItem,
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete stuff unstuff' })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async delete(@Param('id') id: string) {
    const deletedItem = await this.stuffUnstuffService.deleteStuffUnstuff(id);
    if (!deletedItem) {
      throw new NotFoundException('StuffUnstuff not found');
    }
    return {
      statusCode: 200,
      data: deletedItem,
      timestamp: new Date().toISOString(),
    };
  }
}
