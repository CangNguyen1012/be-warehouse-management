import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Operation, OperationSchema } from './schemas/operation.schema';
import { OperationsRepository } from './repository/operations.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operation.name, schema: OperationSchema },
    ]), // 🔥 Thêm dòng này
  ],
  providers: [OperationsService, OperationsRepository],
  controllers: [OperationsController],
})
export class OperationsModule {}
