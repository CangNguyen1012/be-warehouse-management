import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './schemas/language.schema';

@ApiTags('Languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new language' })
  @ApiResponse({
    status: 201,
    description: 'Language created successfully.',
    type: Language,
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Language code already exists.',
  })
  async create(@Body() dto: CreateLanguageDto) {
    const data = await this.languagesService.createLanguage(dto);
    return { statusCode: 201, data };
  }

  @Get()
  @ApiOperation({ summary: 'Get all languages with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Items per page (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of languages.',
    type: [Language],
  })
  async findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    const data = await this.languagesService.findAllLanguages(
      Number(page),
      Number(limit),
    );
    return { data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a language by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Language ID' })
  @ApiResponse({ status: 200, description: 'Language found.', type: Language })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  async findOne(@Param('id') id: string) {
    const data = await this.languagesService.findOneLanguage(id);
    return { statusCode: 200, data };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a language by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Language ID' })
  @ApiResponse({
    status: 200,
    description: 'Language updated successfully.',
    type: Language,
  })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  async update(@Param('id') id: string, @Body() dto: UpdateLanguageDto) {
    const data = await this.languagesService.updateLanguage(id, dto);
    return data;
  }

  @Delete(':id')
  @HttpCode(204) // No Content response
  @ApiOperation({ summary: 'Delete a language by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Language ID' })
  @ApiResponse({ status: 204, description: 'Language deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  async delete(@Param('id') id: string) {
    await this.languagesService.deleteLanguage(id);
  }
}
