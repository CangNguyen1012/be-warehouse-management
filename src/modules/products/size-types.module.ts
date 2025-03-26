import { Module } from '@nestjs/common';
import { SizeTypesController } from './size-types.controller';
import { SizeTypesService } from './size-types.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SizeType, SizeTypeSchema } from './schemas/size-type.schema';
import { SizeTypesRepository } from './repository/size-types.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SizeType.name, schema: SizeTypeSchema },
    ]),
  ],
  controllers: [SizeTypesController],
  providers: [SizeTypesService, SizeTypesRepository],
})
export class SizeTypesModule {}
