import { Injectable } from '@nestjs/common';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { Carro, CarroDocument } from './entities/carro.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CarroAlreadyExists } from '../../test/carro-already-exists.exception';
import { InvalidFabricationYear } from '../../test/invalid-ano-fabricacao.exception';
import { ValidationException } from '../../src/filters/validation.exception';

@Injectable()
export class CarrosService {
  
  constructor(@InjectModel(Carro.name) private carroModel: Model<CarroDocument>) {}

  async create(payload: CreateCarroDto) {

    for (let i in payload){
      if (payload[i] == null) {
          throw new ValidationException([ "Atributo " + i + " é nulo" ])
      }
    }

    if ( payload.anoFabricacao > new Date().getFullYear() ) throw new InvalidFabricationYear();
    if ( await this.carroModel.exists({"placa": payload.placa})) throw new CarroAlreadyExists();
    return new this.carroModel(payload).save();
  }

  async findAll() {
    return this.carroModel.find();
  }

  async findOne(placa: string) {
    return this.carroModel.find({"placa": placa});
  }
  
  async update(placa: string, payload: UpdateCarroDto) {
    let existingCarro;

    for (let i in payload){
      if (payload[i] == null) {throw new ValidationException([ "Atributo " + i + " é nulo" ]) }
    }

    //Lança exceção caso passe uma data maior que a atual
    if (payload.anoFabricacao > new Date().getFullYear()) throw new InvalidFabricationYear();
    
    if ( placa != payload.placa){
      existingCarro = await this.carroModel.findOne({"placa": payload.placa}).exec();
      //Lança exceção caso passe uma placa para atualizar e essa placa já exista
      if (existingCarro) throw new CarroAlreadyExists();
    }


    existingCarro = (await this.carroModel.findOne({"placa": placa}).exec());
    return await this.carroModel.findByIdAndUpdate(existingCarro._id, payload, {new: true});

  }


  remove(id: string) {
    return this.carroModel.deleteOne(
    {
      _id: id
    }
    ).exec();
  }
}
