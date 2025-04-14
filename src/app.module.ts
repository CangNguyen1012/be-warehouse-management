import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SizeTypesModule } from './modules/products/size-types.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { CountriesModule } from './modules/countries/countries.module';
import { JobModeModule } from './modules/job-mode/job-mode.module';
import { CommoditiesModule } from './modules/commodity/commodities.module';
import { CustomerTypesModule } from './modules/customer-types/customer-types.module';
import { ReferModule } from './modules/refer/refer.module';
import { BookingModule } from './modules/booking/booking.module';
import { OperationsModule } from './modules/operations/operations.module';
import { VesselsModule } from './modules/vessels/vessels.module';
import { PortsModule } from './modules/ports/ports.module';
import { CustomersModule } from './modules/customers/customers.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ImosModule } from './modules/imos/imos.module';
import { ContainersModule } from './modules/containers/containers.module';
import { StuffUnstuffsModule } from './modules/stuff-unstuffs/stuff-unstuffs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb+srv://admin:4RthrPNZszs9hsXz@size-container.seauv.mongodb.net/warehouse?retryWrites=true&w=majority',
    ),
    SizeTypesModule,
    LanguagesModule,
    CountriesModule,
    JobModeModule,
    CommoditiesModule,
    CustomerTypesModule,
    ReferModule,
    OperationsModule,
    VesselsModule,
    PortsModule,
    BookingModule,
    CustomersModule,
    JobsModule,
    ImosModule,
    ContainersModule,
    StuffUnstuffsModule,
  ],
})
export class AppModule {}
