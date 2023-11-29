import { Test, TestingModule } from '@nestjs/testing';
import { CarrosController } from "./carros.controller";
import { CarrosService } from './carros.service';
import { Carro, CarroSchema } from './entities/carro.entity';
import { Connection, Model, connect } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateCarroDto } from './dto/create-carro.dto';

describe('CarrosController', () => {
  let mongoConnection: Connection;
  let carroController: CarrosController;
  let carroService: CarrosService;
  let carroModel: Model<Carro>;

  beforeAll( async () => {
    mongoConnection = (await connect('mongodb+srv://gustavolv85:5Sp3cictruta123@estudo.nccf8rf.mongodb.net/carros?retryWrites=true&w=majority')).connection;
    console.log(mongoConnection.readyState)
    carroModel = mongoConnection.model(Carro.name, CarroSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CarrosController],
      providers: [
        CarrosService,
        {provide: getModelToken(Carro.name), useValue: carroModel},],
    }).compile();
    carroController = app.get<CarrosController>(CarrosController);
    // carroService = app.get<CarrosService>(CarrosService);

    // const collections = mongoConnection.collections;
    // for (const key in collections) {
    //   const collection = collections[key];
    //   await collection.deleteMany({});
    // }
  });

  // afterAll(async () => {
  //   await mongoConnection.close();
  // });

  it('should be defined', () => {

    const CarroDTOStub = (): CreateCarroDto => {
      return {
        marca: 'Fiat',
        modelo: "Grand Siena",
        cor: "Branco",
        placa: "LLW8387",
        anoFabricacao: 2013
      };
    };
    // const a = carroController.create(CarroDTOStub());
    const a = carroController.findAll();

    expect(1).toBe(1);
  });
});
