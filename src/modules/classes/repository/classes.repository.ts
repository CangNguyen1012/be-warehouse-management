import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class, ClassDocument } from '../schemas/classes.schema';
import { Model } from 'mongoose';
import { CreateClassDto } from '../dto/create-classes.dto';
import { UpdateClassDto } from '../dto/update-classes.dto';

@Injectable()
export class ClassRepository {
  private readonly logger = new Logger(ClassRepository.name);

  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    this.logger.log(`Creating a new class: ${JSON.stringify(createClassDto)}`);
    const newClass = new this.classModel(createClassDto);
    return await newClass.save();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; results: Class[] }> {
    this.logger.log(`Finding all classes`);
    const total = await this.classModel.countDocuments();
    const skip = (page - 1) * limit;
    const results = await this.classModel.find().skip(skip).limit(limit).lean();
    return { total, results };
  }

  async findById(id: string): Promise<Class | null> {
    this.logger.log(`Finding class with ID: ${id}`);
    return await this.classModel.findById(id).lean();
  }

  async update(
    id: string,
    updateClassDto: UpdateClassDto,
  ): Promise<Class | null> {
    this.logger.log(`Updating class with ID: ${id}`);
    return await this.classModel.findByIdAndUpdate(id, updateClassDto, {
      new: true,
      lean: true,
    });
  }

  async delete(id: string): Promise<Class | null> {
    this.logger.warn(`Deleting class ID: ${id}`);
    return await this.classModel.findByIdAndDelete(id).lean();
  }
}
