import { Module } from '@nestjs/common';
import { CarrosService } from './carros.service';
import { CarrosController } from './carros.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Carro, CarroSchema } from './entities/carro.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Carro.name, schema: CarroSchema }])],
  controllers: [CarrosController],
  providers: [CarrosService],
})
export class CarrosModule {}
