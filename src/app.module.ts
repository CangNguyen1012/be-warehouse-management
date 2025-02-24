import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './modules/products/products.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { CountriesModule } from './modules/countries/countries.module';

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
  ],
})
export class AppModule {}
