import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { StuffUnstuffsRepository } from './repository/stuff-unstuff.repository';
import { CreateStuffUnstuffDto } from './dto/create-stuff-unstuff.dto';
import { StuffUnstuff } from './schemas/stuff-unstuff.schema';
import { UpdateStuffUnstuffDto } from './dto/update-stuff-unstuff.dto';

@Injectable()
export class StuffUnstuffsService {
  private logger = new Logger(StuffUnstuffsService.name);

  constructor(private stuffUnstuffsRepository: StuffUnstuffsRepository) {}

  async createStuffUnstuff(
    createStuffUnstuffDto: CreateStuffUnstuffDto,
  ): Promise<StuffUnstuff> {
    return await this.stuffUnstuffsRepository.create(createStuffUnstuffDto);
  }

  async findAllStuffUnstuffs(page: number, limit: number) {
    const { total, results } = await this.stuffUnstuffsRepository.findAll(
      page,
      limit,
    );
    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findStuffUnstuffById(id: string) {
    const stuffUnstuff = await this.stuffUnstuffsRepository.findById(id);
    if (!stuffUnstuff)
      throw new NotFoundException(`Stuff-unstuff with ID ${id} not found`);
    return stuffUnstuff;
  }

  async updateStuffUnstuff(
    id: string,
    updateStuffUnstuffDto: UpdateStuffUnstuffDto,
  ) {
    return await this.stuffUnstuffsRepository.update(id, updateStuffUnstuffDto);
  }

  async deleteStuffUnstuff(id: string) {
    return await this.stuffUnstuffsRepository.delete(id);
  }
}
