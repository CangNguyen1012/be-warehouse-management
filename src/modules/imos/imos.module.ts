import { Module } from '@nestjs/common';
import { ImosService } from './imos.service';
import { ImosController } from './imos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Imo, ImoSchema } from './schemas/imo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Imo.name, schema: ImoSchema }])],
  providers: [ImosService],
  controllers: [ImosController],
})
export class ImosModule {}
