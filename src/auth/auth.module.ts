import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { localStrategy } from './strategies/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: "COntoDoManolo",
    signOptions: {expiresIn: '1d'},

  })],
  controllers: [AuthController],
  providers: [AuthService, localStrategy, JwtStrategy]
})
export class AuthModule {}
