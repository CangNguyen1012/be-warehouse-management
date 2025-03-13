import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReferService } from './refer.service';
import { Refer } from './schemas/refer.schema';
import { CreateReferDto } from './dto/create-refer.dto';
import { UpdateReferDto } from './dto/update-refer.dto';

@Controller('refer')
@ApiTags('refer')
export class ReferController {
  constructor(private readonly referService: ReferService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new refer' })
  @ApiResponse({
    status: 201,
    description: 'Refer successfully created.',
    type: Refer,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async create(@Body() createReferDto: CreateReferDto) {
    const newRefer = await this.referService.create(createReferDto);
    return {
      statusCode: 201,
      message: 'Refer successfully created',
      data: newRefer,
      timestamps: new Date().toISOString(),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all refers with pagination' })
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of refers.',
    type: Refer,
    isArray: true,
  })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const data = await this.referService.findAll(Number(page), Number(limit));

    return {
      statusCode: 200,
      message: 'Successfully retrieved the list of refers',
      data,
      timestamps: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get refer by ID' })
  @ApiResponse({
    status: 200,
    description: 'Refer successfully retrieved.',
    type: Refer,
  })
  @ApiNotFoundResponse({ description: 'Refer not found' })
  @ApiParam({
    name: 'id',
    description: 'ID of the refer',
    type: String,
    required: true,
  })
  async findOne(@Param('id') id: string) {
    const refer = await this.referService.findOne(id);
    return {
      statusCode: 200,
      message: 'Refer successfully retrieved',
      data: refer,
      timestamps: new Date().toISOString(),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a refer by ID' })
  @ApiResponse({
    status: 200,
    description: 'Refer successfully updated.',
    type: Refer,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Refer not found' })
  @ApiParam({
    name: 'id',
    description: 'ID of the refer',
    type: String,
    required: true,
  })
  async update(
    @Param('id') id: string,
    @Body() updateReferDto: UpdateReferDto,
  ) {
    const updatedRefer = await this.referService.replace(id, updateReferDto);
    return {
      statusCode: 200,
      message: 'Refer successfully updated',
      data: updatedRefer,
      timestamps: new Date().toISOString(),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a refer by ID' })
  @ApiResponse({
    status: 200,
    description: 'Refer successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Refer not found' })
  @ApiParam({
    name: 'id',
    description: 'ID of the refer',
    type: String,
    required: true,
  })
  async remove(@Param('id') id: string) {
    await this.referService.remove(id);
    return {
      statusCode: 200,
      message: 'Refer successfully deleted',
      timestamps: new Date().toISOString(),
    };
  }
}
