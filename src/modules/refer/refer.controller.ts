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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReferService } from './refer.service';
import { Refer } from './schemas/refer.schema';
import { CreateReferDto } from './dto/create-refer.dto';
import { UpdateReferDto } from './dto/update-refer.dto';

@Controller('refer')
@ApiTags('refer')
export class ReferController {
  constructor(private readonly referService: ReferService) {}

  @Post()
  @ApiOperation({ summary: 'Create refer' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Refer,
  })
  create(@Body() createReferDto: CreateReferDto) {
    return this.referService.create(createReferDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all refers' })
  @ApiResponse({
    status: 200,
    description: 'The list of refers has been successfully retrieved.',
    type: Refer,
    isArray: true,
  })
  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit?: number) {
    const data = await this.referService.findAll(Number(page), Number(limit));

    return {
      statusCode: 200,
      data: {
        page: data.page,
        limit: data.limit, // Ensure `limit` is correctly passed
        total: data.total,
        results: data.results,
      },
      timestamps: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get refer by id' })
  @ApiResponse({
    status: 200,
    description: 'The refer has been successfully retrieved.',
    type: Refer,
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the refer',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.referService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Replace refer' })
  @ApiResponse({
    status: 200,
    description: 'The refer has been successfully updated.',
    type: Refer,
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the refer',
    type: String,
    required: true,
  })
  update(@Param('id') id: string, @Body() updateReferDto: UpdateReferDto) {
    return this.referService.replace(id, updateReferDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete refer' })
  @ApiResponse({
    status: 200,
    description: 'The refer has been successfully deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the refer',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.referService.remove(id);
  }
}
