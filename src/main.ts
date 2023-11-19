import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationFilter } from './filters/validation.filter';
import { ValidationException } from './filters/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new ValidationFilter()
  )
  app.useGlobalPipes( new ValidationPipe({
    skipMissingProperties:true,
    exceptionFactory: (erros: ValidationError[]) => {
      const message = erros.map(
        error => `${error.property} has wrong value ${error.value}, 
        ${Object.values(error.constraints).join(', ')}`
      )
      return new ValidationException(message);

    }
  }));
  await app.listen(3000);
}
bootstrap();
