import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Terminal, TerminalDocument } from '../schemas/terminal.schema';
import { Model } from 'mongoose';
import { UpdateTerminalDto } from '../dto/update-terminal.dto';
import { CreateTerminalDto } from '../dto/create-terminal.dto';

@Injectable()
export class TerminalRepository {
  constructor(
    @InjectModel(Terminal.name) private terminalModel: Model<TerminalDocument>,
  ) {}

  async findAll(): Promise<Terminal[]> {
    return await this.terminalModel.find().select('-_id').select('-__v').exec();
  }

  async findById(id: string): Promise<Terminal | null> {
    return await this.terminalModel.findById(id).exec();
  }

  async update(
    id: string,
    updateTerminalDto: UpdateTerminalDto,
  ): Promise<Terminal | null> {
    return await this.terminalModel
      .findByIdAndUpdate(id, updateTerminalDto, { new: true })
      .exec();
  }

  async create(createTerminalDto: CreateTerminalDto): Promise<Terminal> {
    return await this.terminalModel.create(createTerminalDto);
  }
}
