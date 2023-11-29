import { Module } from '@nestjs/common';
import { CarrosModule } from './carros/carros.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://172.18.0.2:27017/carros?directConnection=true'),
    MongooseModule.forRoot('mongodb+srv://gustavolv85:5Sp3cictruta123@estudo.nccf8rf.mongodb.net/carros?retryWrites=true&w=majority'),
    CarrosModule,
    UsersModule,
    AuthModule
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}
