import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { MongooseExceptionFilter } from './common/filters/mongoose-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove unknown properties
      forbidNonWhitelisted: true, // Reject unknown properties
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  app.useGlobalFilters(new MongooseExceptionFilter());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Warehouse Management')
    .setDescription('The Warehouse Management API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
