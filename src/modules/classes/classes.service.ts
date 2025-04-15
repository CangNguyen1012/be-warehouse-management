import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassRepository } from './repository/classes.repository';
import { CreateClassDto } from './dto/create-classes.dto';
import { Class } from './schemas/classes.schema';
import { UpdateClassDto } from './dto/update-classes.dto';

@Injectable()
export class ClassesService {
  constructor(private classRepository: ClassRepository) {}

  async createClass(createClassDto: CreateClassDto): Promise<Class> {
    const newClass = await this.classRepository.create(createClassDto);
    return newClass;
  }

  async findAllClasses(page: number = 1, limit: number) {
    const { total, results } = await this.classRepository.findAll(page, limit);
    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOneClass(id: string): Promise<Class> {
    const classData = await this.classRepository.findById(id);
    if (!classData)
      throw new NotFoundException(`Class with ID ${id} not found`);
    return classData;
  }

  async updateClass(id: string, updateClassDto: UpdateClassDto) {
    const updatedClass = await this.classRepository.update(id, updateClassDto);
    if (!updatedClass)
      throw new NotFoundException(`Class with ID ${id} not found`);
    return updatedClass;
  }

  async deleteClass(id: string): Promise<Class> {
    const deletedClass = await this.classRepository.delete(id);
    if (!deletedClass)
      throw new NotFoundException(`Class with ID ${id} not found`);
    return deletedClass;
  }
}
