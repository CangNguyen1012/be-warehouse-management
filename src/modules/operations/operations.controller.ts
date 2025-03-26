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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { UpdateOperationDto } from './dtos/update-operation.dto';

@Controller('operations')
@ApiTags('Operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create operation' })
  @ApiResponse({ status: 201, description: 'Operation created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationsService.createOperation(createOperationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all operations' })
  @ApiResponse({
    status: 200,
    description: 'Operations retrieved successfully',
  })
  findAll(@Query('limit') limit: number = 5000) {
    return this.operationsService.findAllOperations(1, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get operation by id' })
  @ApiResponse({ status: 200, description: 'Operation retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Operation not found' })
  findOne(@Param('id') id: string) {
    return this.operationsService.findOneOperation(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update operation' })
  @ApiResponse({ status: 200, description: 'Operation updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Operation not found' })
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationsService.updateOperation(id, updateOperationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete operation' })
  @ApiResponse({ status: 200, description: 'Operation deleted successfully' })
  @ApiResponse({ status: 404, description: 'Operation not found' })
  remove(@Param('id') id: string) {
    return this.operationsService.deleteOperation(id);
  }
}
