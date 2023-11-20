import { Test, TestingModule } from "@nestjs/testing";
import { CarrosController } from "./carros.controller";
import { CarrosService } from "./carros.service";
import { Connection, connect, Model } from "mongoose";
import { Carro, CarroSchema } from "./entities/carro.entity";
import { getModelToken } from "@nestjs/mongoose";
import { CreateCarroDto } from "./dto/create-carro.dto";
import { CarroAlreadyExists } from "../../test/carro-already-exists.exception";
import { InvalidFabricationYear } from "../../test/invalid-ano-fabricacao.exception";
import { ValidationException } from "../../src/filters/validation.exception";


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

  describe("SERVICE - Criando Carro", () => {
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
          modelo: "Grand Siena",
          cor: "Prata",
          placa: "PPK8822",
          anoFabricacao: 2031
        };
      };
      await expect(carroService.create(CarroDTOStub())).rejects.toThrow(InvalidFabricationYear);    
    });

    it("Exception while creanting object car with null attribute", async () => {
      const CarroDTOStub = (): CreateCarroDto => {
        return {
          marca: 'Fiat',
          modelo: "Grand Siena",
          cor: "Prata",
          placa: null,
          anoFabricacao: 2031
        };
      };
      await expect(carroService.create(CarroDTOStub())).rejects.toThrow(ValidationException);    
    });

    });




  describe("UpdateCarro", () => {
    it("Returning saved object", async () => {
      const CarroDTOStub = (): CreateCarroDto => {
        return {
          marca: 'Chevrolet',
          modelo: "Prisma",
          cor: "Vermelho",
          placa: "IPO2345",
          anoFabricacao: 2014
        };
      };
      carroService.create(CarroDTOStub());

      const CarroDTOStub2 = (): CreateCarroDto => {
        return {
          marca: 'Chevrolet',
          modelo: "Azul",
          cor: "Vermelho",
          placa: "IPO23455",
          anoFabricacao: 2014
        };
      };

      const updateCarro = await carroService.update("IPO2345", CarroDTOStub2());
      expect(updateCarro.marca).toBe(CarroDTOStub2().marca);
      expect(updateCarro.modelo).toBe(CarroDTOStub2().modelo);
      expect(updateCarro.cor).toBe(CarroDTOStub2().cor);
      expect(updateCarro.placa).toBe(CarroDTOStub2().placa);
      expect(updateCarro.anoFabricacao).toBe(CarroDTOStub2().anoFabricacao);
      expect(updateCarro).toHaveProperty("_id")
    });
    it("Exception caso a placa passada já exista em outro veiculo", async () => {
      const CarroDTOStub2 = (): CreateCarroDto => {
        return {
          marca: 'Volks',
          modelo: "Voyage",
          cor: "Prata",
          placa: "IIP9834",
          anoFabricacao: 2008
        };
      };

      const CarroDTOStub = (): CreateCarroDto => {
        return {
          marca: 'Fiat',
          modelo: "Grand Siena",
          cor: "Branco",
          placa: "LLW8387",
          anoFabricacao: 2013
        };
      };
        carroController.create(CarroDTOStub2())
        await expect(carroController.update("IIP9834", CarroDTOStub())).rejects.toThrow(CarroAlreadyExists); 
    }) 
    it("Exception caso anoFabricação for maior que ano atual", async () => {
      const CarroDTOStub = (): CreateCarroDto => {
        return {
          marca: 'Fiat',
          modelo: "Grand Siena",
          cor: "Branco",
          placa: "LLW8387",
          anoFabricacao: 2033
        };
      };
        await expect(carroController.update("LLW8387", CarroDTOStub())).rejects.toThrow(InvalidFabricationYear);
    })
    it("Exception updating car object with null attribute", async () => {
      const CarroDTOStub = (): CreateCarroDto => {
        return {
          marca: 'Fiat',
          modelo: "Grand Siena",
          cor: null,
          placa: "LLW8387",
          anoFabricacao: 2013
        };
      };
      await expect(carroService.update("LLW8387", CarroDTOStub())).rejects.toThrow(ValidationException);    
    });
  })


});