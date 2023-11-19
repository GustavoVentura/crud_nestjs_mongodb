import { Test, TestingModule } from "@nestjs/testing";
import { CarrosController } from "./carros.controller";
import { CarrosService } from "./carros.service";
import { connect, Connection, Model } from "mongoose";
import { Carro } from "./entities/carro.entity";
import { getModelToken } from "@nestjs/mongoose";
import { CarroDTOStub } from "../../test/stubs/carro.dto.stub";


describe("Criando Carro", () => {
  let mongoConnection: Connection;
  let carroModel: Model<Carro>;
  let carroService: CarrosService;
  let carroController: CarrosController;

  beforeAll( async () => {
    mongoConnection = (await connect('mongodb+srv://gustavolv85:5Sp3cictruta123@estudo.nccf8rf.mongodb.net/carros?retryWrites=true&w=majority')).connection;
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CarrosController],
      providers: [
        CarrosService,
        {provide: getModelToken(Carro.name), useValue: carroModel},
      ],
    }).compile();
    carroService = app.get<CarrosService>(CarrosService);
    carroController = app.get<CarrosController>(CarrosController);
  })

  afterAll( async () => {
    mongoConnection.close();
  })

  it("Should be able to create a user", async () => {
    // const carroData: CreateCarroDto = {
    //   marca: "Fiat",
    //   modelo: "Grand Siena",
    //   cor: "Branco",
    //   placa: "LLW8387",
    //   anoFabricacao: 2013
    // }
  
    // await carroService.create(CarroDTOStub());
    const carro = await carroController.create(CarroDTOStub());
  })

  
});

// describe("AppController", () => {
//   let carroController: CarrosController;
//   let mongod: MongoMemoryServer;
//   let mongoConnection: Connection;
//   let carroModel: Model<Carro>;

//   beforeAll(async () => {
//     mongoConnection = (await connect('mongodb+srv://gustavolv85:5Sp3cictruta123@estudo.nccf8rf.mongodb.net/carros?retryWrites=true&w=majority')).connection;
//     carroModel = mongoConnection.model(Carro.name, CarroSchema);
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [CarrosController],
//       providers: [
//         CarrosService,
//         {provide: getModelToken(Carro.name), useValue: carroModel},
//       ],
//     }).compile();
//     carroController = app.get<CarrosController>(CarrosController);
//   });

//   afterAll(async () => {
//     await mongoConnection.close();
//   });

//   beforeAll(async () => {
//     const collections = mongoConnection.collections;
//     for (const key in collections) {
//       const collection = collections[key];
//       await collection.deleteMany({});
//     }
//   });

//   describe("PostCarro", () => {
//     it("Espera-se que retorne um objeto carro inserido no mongodb", async () => {
//       const createdCarro = await carroController.create(CarroDTOStub());
//       expect(createdCarro.placa).toBe(CarroDTOStub().placa);
//     });
//     it("Lança uma exceção caso a placa passada já exista em outro veículo (Bad Request - 400) exception", async () => {
//       await expect(carroController.create(CarroDTOStub()))
//         .rejects
//         .toThrow(CarroAlreadyExists);
//     });
//     it("Lança exceção caso o anoFabricacao passado seja maior que o ano atual", async () => {
//         const anoAtual = new Date().getFullYear()
//         expect(carroController.create(CarroDTOStubInvalidFabricationYear()))
//         .rejects.toThrow(InvalidFabricationYear)
//     })
//   });


//   describe("UpdateCarro", () => {
//     it("Lança exceção caso a placa passada já exista em outro veiculo (Bad Request - 400) exception", async () => {
//         carroController.create(CarroDTOStub2());
//         await expect(carroController.update(CarroUpdateDTOStub().placa, CarroUpdateDTOStub())).rejects.toThrow(CarroAlreadyExists); 
//     }) 
//     it("Lança exceção caso o anoFabricação passado for maior que anos atual", async () => {
//         const anoAtual = new Date().getFullYear()
//         await expect(carroController.update("LLW9988", CarroUpdateDTOInvalidFabricationYearStub())).rejects.toThrow(InvalidFabricationYear);
//     })
//   })

//   describe("getArticle", () => {
//     it("should return the corresponding saved object", async () => {
//       await (new carroModel(CarroDTOStub()).save());
//       const carro = await carroController.findOne(CarroDTOStub().placa);
//       expect(carro).toBe(CarroDTOStub().placa);
//     });
//     it("should return null", async () => {
//       const carro = await carroController.findOne(CarroDTOStub().marca);
//       expect(carro).toBeNull();
//     });
//   });
// });