import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/warehouse'),
    ProductsModule,
  ],
  
})
export class AppModule {}
