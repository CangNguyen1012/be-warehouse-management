import { Module } from '@nestjs/common';
import { ContainerService } from './containers.service';
import { ContainerController } from './containers.controller';
import { ContainerRepository } from './repository/containers.reposity';
import { MongooseModule } from '@nestjs/mongoose';
import { Container, ContainerSchema } from './schemas/container.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Container.name, schema: ContainerSchema },
    ]),
  ],
  providers: [ContainerService, ContainerRepository],
  controllers: [ContainerController],
})
export class ContainersModule {}
