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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-classes.dto';
import { UpdateClassDto } from './dto/update-classes.dto';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private classService: ClassesService) {}

  @Post()
  @ApiOperation({ summary: 'Create class' })
  @ApiResponse({ status: 201, description: 'Class created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createClassDto: CreateClassDto) {
    return await this.classService.createClass(createClassDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all classes' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({
    status: 200,
    description: 'Classes retrieved successfully',
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
  ) {
    return await this.classService.findAllClasses(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one class' })
  @ApiResponse({
    status: 200,
    description: 'Class retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Classes not found' })
  async findOne(@Param('id') id: string) {
    return await this.classService.findOneClass(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update classes' })
  @ApiResponse({
    status: 200,
    description: 'Classes updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Classes not found' })
  async update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return await this.classService.updateClass(id, updateClassDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a class' })
  @ApiResponse({
    status: 200,
    description: 'Class deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Class not found' })
  async delete(@Param('id') id: string) {
    return await this.classService.deleteClass(id);
  }
}
