import { Test, TestingModule } from "@nestjs/testing";
import { CarrosController } from "./carros.controller";
import { CarrosService } from "./carros.service";
import { CarroDTOStub } from "../../test/stubs/carro.dto.stub";
import { CarroAlreadyExists } from "../../test/carro-already-exists.exception";
import { Carro, CarroDocument } from "./entities/carro.entity";
import { Model } from "mongoose";

const {MongoClient} = require('mongodb');

describe("CarrosController", () => {
  let carroController: CarrosController;
  let carroModel: Model<CarroDocument>;
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb+srv://gustavolv85:5Sp3cictruta123@estudo.nccf8rf.mongodb.net/carros?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
      
    db = await connection.db('carros');

    // const app: TestingModule = await Test.createTestingModule({
    //   controllers: [CarrosController],
    //   providers: [
    //     CarrosService,
    //   ],
    // }).compile();
    // carroController = app.get<CarrosController>(CarrosController);
  });

  afterAll(async () => {
    await connection.close();
  });


  describe("postCarro", () => {
    it("should return the saved object", async () => {
        const collection = db.collection('users');
        const mockCarro = { marca: "Honda", modelo: "HRV", cor: "preto", placa: "LLX9988", anoFabricacao: 2023 }

        await collection.create(mockCarro)
        const insertedCarro = await collection.findOne({placa: 'LLX9988'});
        expect(insertedCarro).toEqual(mockCarro);
      
    });
    // it("should return CarroAlreadyExists (Bad Request - 400) exception", async () => {
    //   await (new carroModel (CarroDTOStub()).save());
    //   await expect(carroController.create(CarroDTOStub()))
    //     .rejects
    //     .toThrow(CarroAlreadyExists);
    // });
  });





});