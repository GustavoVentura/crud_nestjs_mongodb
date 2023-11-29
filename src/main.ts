import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationFilter } from './filters/validation.filter';
import { ValidationException } from './filters/validation.exception';
import * as session from 'express-session';
import * as passport from 'passport';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(
  //   session({
  //     secret: "ik82hdmç0dScf42qHDsd",
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie:{
  //       maxAge: 60000,
  //     }
  //   })
  // )
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
