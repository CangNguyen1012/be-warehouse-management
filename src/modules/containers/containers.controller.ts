import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ContainerService } from './containers.service';
import { Container } from './schemas/container.schema';
import { CreateContainerDto } from './dtos/create-container.dto';
import { UpdateContainerDto } from './dtos/update-container.dto';

@Controller('containers')
export class ContainerController {
  constructor(private readonly containerService: ContainerService) {}

  @Post()
  async create(@Body() data: CreateContainerDto): Promise<Container> {
    return this.containerService.create(data);
  }

  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.containerService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Container> {
    return this.containerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateContainerDto,
  ): Promise<Container> {
    return this.containerService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Container> {
    return this.containerService.delete(id);
  }
}
