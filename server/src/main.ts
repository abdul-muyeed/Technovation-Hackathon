import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins

  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Allow credentials
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors
          .map((err) => {
            return Object.values(err.constraints || {});
          })
          .flat();

        return new BadRequestException({
          message: 'Validation Error',
          statusCode: 400,
          errors: formattedErrors,
        });
      },
    }),
  );
  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Hackathon')
    .setDescription('The Hackathon API description')
    .setVersion('1.0')
    .addTag('hackathon')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
