import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './schemas/language.schema';
import { UpdateLanguageDto } from './dto/update-language.dto';

@ApiTags('Languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new language' })
  @ApiResponse({ status: 201, description: 'Language created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Language code already exists.',
  })
  create(@Body() createLanguageDto: CreateLanguageDto): Promise<Language> {
    return this.languagesService.createLanguage(createLanguageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all languages' })
  findAll(): Promise<Language[]> {
    return this.languagesService.findAllLanguages();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a language by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string): Promise<Language> {
    return this.languagesService.findOneLanguage(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a language by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ): Promise<Language> {
    return this.languagesService.updateLanguage(id, updateLanguageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a language by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  delete(@Param('id') id: string): Promise<void> {
    return this.languagesService.deleteLanguage(id);
  }
}
