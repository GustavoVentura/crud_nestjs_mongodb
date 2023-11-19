import { Test, TestingModule } from "@nestjs/testing";
import { CarrosController } from "./carros.controller";
import { CarrosService } from "./carros.service";
import { Connection, connect, Model } from "mongoose";
import { Carro, CarroSchema } from "./entities/carro.entity";
import { getModelToken } from "@nestjs/mongoose";
import { CreateCarroDto } from "./dto/create-carro.dto";
import { CarroAlreadyExists } from "../../test/carro-already-exists.exception";
import { InvalidFabricationYear } from "../../test/invalid-ano-fabricacao.exception";


describe("AppController", () => {
  let mongoConnection: Connection;
  let carroController: CarrosController;
  let carroService: CarrosService;
  let carroModel: Model<Carro>;

  beforeAll( async () => {
    mongoConnection = (await connect('mongodb+srv://gustavolv85:5Sp3cictruta123@estudo.nccf8rf.mongodb.net/carros?retryWrites=true&w=majority')).connection;
    carroModel = mongoConnection.model(Carro.name, CarroSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CarrosController],
      providers: [
        CarrosService,
        {provide: getModelToken(Carro.name), useValue: carroModel},
      ],
    }).compile();
    carroController = app.get<CarrosController>(CarrosController);
    carroService = app.get<CarrosService>(CarrosService);
  });

  afterAll(async () => {
    await mongoConnection.close();
  });

  beforeAll(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe("Criando Carro", () => {
    // Criando primeiro objeto carro, deve retornar o objeto salvo
    it("Returning saved object", async () => {
      const CarroDTOStub = (): CreateCarroDto => {
        return {
          marca: 'Fiat',
          modelo: "Grand Siena",
          cor: "Branco",
          placa: "LLW8387",
          anoFabricacao: 2013
        };
      };

      const createdCarro = await carroService.create(CarroDTOStub());
      expect(createdCarro.marca).toBe(CarroDTOStub().marca);
      expect(createdCarro.modelo).toBe(CarroDTOStub().modelo);
      expect(createdCarro.cor).toBe(CarroDTOStub().cor);
      expect(createdCarro.placa).toBe(CarroDTOStub().placa);
      expect(createdCarro.anoFabricacao).toBe(CarroDTOStub().anoFabricacao);
      expect(createdCarro).toHaveProperty("_id")
    });

    // Criando o mesmo objeto carro anterior, deve retornar uma exception Carro Alread Exists
    it("Exception creanting alread exists car object", async () => {
      const CarroDTOStub = (): CreateCarroDto => {
        return {
          marca: 'Fiat',
          modelo: "Grand Siena",
          cor: "Branco",
          placa: "LLW8387",
          anoFabricacao: 2013
        };
      };
      await expect(carroService.create(CarroDTOStub())).rejects.toThrow(CarroAlreadyExists);    
    });

    it("Exception creanting anoFabricacao greater than current year", async () => {
      const CarroDTOStub = (): CreateCarroDto => {
        return {
          marca: 'Fiat',
          modelo: "Toro",
          cor: "Prata",
          placa: "PPK8822",
          anoFabricacao: 2031
        };
      };
      await expect(carroService.create(CarroDTOStub())).rejects.toThrow(InvalidFabricationYear);    
    });



    // it("Lança exceção caso o anoFabricacao passado seja maior que o ano atual", async () => {
    //     const anoAtual = new Date().getFullYear()
    //     expect(carroController.create(CarroDTOStubInvalidFabricationYear()))
    //     .rejects.toThrow(InvalidFabricationYear)
    // })
  });


  // describe("UpdateCarro", () => {
  //   it("Lança exceção caso a placa passada já exista em outro veiculo (Bad Request - 400) exception", async () => {
  //       carroController.create(CarroDTOStub2());
  //       await expect(carroController.update(CarroUpdateDTOStub().placa, CarroUpdateDTOStub())).rejects.toThrow(CarroAlreadyExists); 
  //   }) 
  //   it("Lança exceção caso o anoFabricação passado for maior que anos atual", async () => {
  //       const anoAtual = new Date().getFullYear()
  //       await expect(carroController.update("LLW9988", CarroUpdateDTOInvalidFabricationYearStub())).rejects.toThrow(InvalidFabricationYear);
  //   })
  // })

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
});