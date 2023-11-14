import { Injectable } from '@nestjs/common';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { Carro, CarroDocument } from './entities/carro.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CarrosService {
  
  constructor(@InjectModel(Carro.name) private carroModel: Model<CarroDocument>) {}

  create(createCarroDto: CreateCarroDto) {
    const carro = new this.carroModel(createCarroDto);
    return carro.save();
  }

  findAll() {
    return this.carroModel.find();
  }

  findOne(id: string) {
    return this.carroModel.findById(id);
  }

  update(id: string, payload: UpdateCarroDto) {
    return this.carroModel.findByIdAndUpdate( id, payload ,{ new: true } );
  }

  remove(id: string) {
    return this.carroModel.deleteOne(
    {
      _id: id
    }
    ).exec();
  }
}
