import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CustomerType,
  CustomerTypeSchema,
} from './schemas/customer-type.schema';
import { CustomerTypesService } from './customer-types.service';
import { CustomerTypesController } from './customer-types.controller';
import { CustomerTypesRepository } from './repository/customer-types.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerType.name, schema: CustomerTypeSchema },
    ]),
  ],
  controllers: [CustomerTypesController],
  providers: [CustomerTypesService, CustomerTypesRepository],
  exports: [CustomerTypesService],
})
export class CustomerTypesModule {}
