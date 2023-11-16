import { Injectable } from '@nestjs/common';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { Carro, CarroDocument } from './entities/carro.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CarroAlreadyExists } from '../../test/carro-already-exists.exception';

@Injectable()
export class CarrosService {
  
  constructor(@InjectModel(Carro.name) private carroModel: Model<CarroDocument>) {}

  async create(createCarroDto: CreateCarroDto) {
    const existingCarro = await this.carroModel.findOne({"placa": createCarroDto.placa}).exec();
    console.log(existingCarro)
    if (existingCarro) throw new CarroAlreadyExists();
    const carro = new this.carroModel(createCarroDto);
    return carro.save();
  }

  findAll() {
    return this.carroModel.find();
  }

  findOne(placa: string) {
    // return this.carroModel.findById(id);
    console.log(this.carroModel.find({"placa": placa}));
    return this.carroModel.find({"placa": placa});
  }

  // findbyPlaca(placa: string) {
  //   return this.carroModel.find({"placa": placa});
  // }

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
