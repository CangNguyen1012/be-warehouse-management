import { Injectable, NotFoundException } from '@nestjs/common';
import { ContainerRepository } from './repository/containers.reposity';
import { Container } from './schemas/container.schema';
import { CreateContainerDto } from './dtos/create-container.dto';
import { UpdateContainerDto } from './dtos/update-container.dto';

@Injectable()
export class ContainerService {
  constructor(private readonly containerRepository: ContainerRepository) {}

  async create(data: CreateContainerDto): Promise<Container> {
    return this.containerRepository.create(data);
  }

  async findAll(
    page: number = 1,
    limit: number,
    operationCode?: string,
    isoSizetype?: string,
  ) {
    const { total, results } = await this.containerRepository.findAll(
      page,
      limit,
      operationCode,
      isoSizetype,
    );
    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(id: string): Promise<Container> {
    const container = await this.containerRepository.findOne(id);
    if (!container)
      throw new NotFoundException(`Container with ID ${id} not found`);
    return container;
  }

  async update(id: string, data: UpdateContainerDto): Promise<Container> {
    const updated = await this.containerRepository.update(id, data);
    if (!updated)
      throw new NotFoundException(`Container with ID ${id} not found`);
    return updated;
  }

  async delete(id: string): Promise<Container> {
    const deleted = await this.containerRepository.delete(id);
    if (!deleted)
      throw new NotFoundException(`Container with ID ${id} not found`);
    return deleted;
  }
}
