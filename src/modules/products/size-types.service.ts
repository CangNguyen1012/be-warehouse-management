import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizeTypeDto } from './dto/create-size-type.dto';
import { UpdateSizeTypeDto } from './dto/update-size-type.dto';
import { SizeTypesRepository } from './repository/size-types.repository';

@Injectable()
export class SizeTypesService {
  constructor(private sizeTypesRepository: SizeTypesRepository) {}

  async createSizeType(createSizeTypeDto: CreateSizeTypeDto) {
    return await this.sizeTypesRepository.create(createSizeTypeDto);
  }

  async findAllSizeTypes(page: number, limit: number, operationCode?: string) {
    const { total, results } = await this.sizeTypesRepository.findAll(
      page,
      limit,
      operationCode,
    );
    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOneSizeType(id: string) {
    const sizeType = await this.sizeTypesRepository.findById(id);
    if (!sizeType)
      throw new NotFoundException(`SizeType with ID ${id} not found`);
    return sizeType;
  }

  async updateSizeType(id: string, updateSizeTypeDto: UpdateSizeTypeDto) {
    return await this.sizeTypesRepository.update(id, updateSizeTypeDto);
  }

  async deleteSizeType(id: string) {
    return await this.sizeTypesRepository.delete(id);
  }
}
