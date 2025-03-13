import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language } from './schemas/language.schema';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectModel(Language.name) private readonly languageModel: Model<Language>,
  ) {}

  async createLanguage(dto: CreateLanguageDto): Promise<Language> {
    try {
      if (!dto.languageCode)
        throw new BadRequestException('Language code is required');

      const existing = await this.languageModel
        .findOne({ languageCode: dto.languageCode })
        .lean();
      if (existing) {
        throw new ConflictException(
          `Language with code ${dto.languageCode} already exists`,
        );
      }

      return await this.languageModel.create(dto);
    } catch {
      throw new InternalServerErrorException('Error creating language');
    }
  }

  async findAllLanguages(page = 1, limit = 10) {
    try {
      page = Math.max(1, page); // Ensure page is at least 1
      limit = Math.max(1, limit); // Ensure limit is at least 1

      const total = await this.languageModel.countDocuments();
      const results = await this.languageModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return { page, limit, total, results };
    } catch {
      throw new InternalServerErrorException('Error fetching languages');
    }
  }

  async findOneLanguage(id: string): Promise<Language> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid language ID format');
    }

    const language = await this.languageModel.findById(id).lean();
    if (!language)
      throw new NotFoundException(`Language with ID ${id} not found`);

    return language;
  }

  async updateLanguage(id: string, dto: UpdateLanguageDto): Promise<Language> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid language ID format');
    }

    const updated = await this.languageModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean();
    if (!updated)
      throw new NotFoundException(`Language with ID ${id} not found`);

    return updated;
  }

  async deleteLanguage(id: string): Promise<void> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid language ID format');
    }

    const result = await this.languageModel.findByIdAndDelete(id).lean();
    if (!result)
      throw new NotFoundException(`Language with ID ${id} not found`);
  }
}
