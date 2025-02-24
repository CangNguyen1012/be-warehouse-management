import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Language } from './schemas/language.schema';
import { Model } from 'mongoose';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectModel(Language.name) private languageModel: Model<Language>,
  ) {}

  async createLanguage(
    createLanguageDto: CreateLanguageDto,
  ): Promise<Language> {
    const newLanguage = new this.languageModel(createLanguageDto);
    return newLanguage.save();
  }

  async findAllLanguages(): Promise<Language[]> {
    return this.languageModel.find().exec();
  }

  async findOneLanguage(id: string): Promise<Language> {
    const language = await this.languageModel.findById(id).exec();
    if (!language)
      throw new NotFoundException(`Language with ID ${id} not found`);
    return language;
  }

  async updateLanguage(
    id: string,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<Language> {
    const updatedLanguage = await this.languageModel
      .findByIdAndUpdate(id, updateLanguageDto, { new: true })
      .exec();
    if (!updatedLanguage)
      throw new NotFoundException(`Language with ID ${id} not found`);
    return updatedLanguage;
  }

  async deleteLanguage(id: string): Promise<void> {
    const result = await this.languageModel.findByIdAndDelete(id).exec();
    if (!result)
      throw new NotFoundException(`Language with ID ${id} not found`);
  }
}
