import { Module } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { TerminalController } from './terminal.controller';
import { TerminalRepository } from './repository/terminal.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Terminal, TerminalSchema } from './schemas/terminal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Terminal.name, schema: TerminalSchema },
    ]),
  ],
  providers: [TerminalService, TerminalRepository],
  controllers: [TerminalController],
})
export class TerminalModule {}
