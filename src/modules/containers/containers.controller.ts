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
import { ApiQuery } from '@nestjs/swagger';

@Controller('containers')
export class ContainerController {
  constructor(private readonly containerService: ContainerService) {}

  @Post()
  async create(@Body() data: CreateContainerDto): Promise<Container> {
    return this.containerService.create(data);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Results per page',
  })
  @ApiQuery({
    name: 'operationCode',
    type: String,
    required: false,
    description: 'Operation code',
  })
  @ApiQuery({
    name: 'isoSizetype',
    type: String,
    required: false,
    description: 'ISO sizetype',
  })
  @ApiQuery({
    name: 'containerNo',
    type: String,
    required: false,
    description: 'Container number',
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5000,
    @Query('operationCode') operationCode?: string,
    @Query('isoSizetype') isoSizetype?: string,
    @Query('containerNo') containerNo?: string,
  ) {
    return await this.containerService.findAll(
      page,
      limit,
      operationCode,
      isoSizetype,
      containerNo,
    );
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
