import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './modules/products/products.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { CountriesModule } from './modules/countries/countries.module';
import { JobModeModule } from './modules/job-mode/job-mode.module';
import { CommoditiesModule } from './modules/commodity/commodities.module';
import { StuffUnstuffModule } from './modules/stuff-unstuff/stuff-unstuff.module';
import { CustomerTypesModule } from './modules/customer-types/customer-types.module';
import { ReferModule } from './modules/refer/refer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb+srv://admin:4RthrPNZszs9hsXz@size-container.seauv.mongodb.net/warehouse?retryWrites=true&w=majority',
    ),
    ProductsModule,
    LanguagesModule,
    CountriesModule,
    JobModeModule,
    CommoditiesModule,
    StuffUnstuffModule,
    CustomerTypesModule,
    ReferModule,
  ],
})
export class AppModule {}
