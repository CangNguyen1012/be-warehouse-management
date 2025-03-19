import { Module } from '@nestjs/common';
import { PortsService } from './ports.service';
import { PortsController } from './ports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Port, PortSchema } from './schemas/port.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Port.name, schema: PortSchema }]),
  ],
  providers: [PortsService],
  controllers: [PortsController],
})
export class PortsModule {}
