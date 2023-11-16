import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { CarrosController } from "./carros.controller";
import { CarrosService } from "./carros.service";
import { Connection, connect, Model } from "mongoose";
import { Carro, CarroSchema } from "./entities/carro.entity";
import { getModelToken } from "@nestjs/mongoose";
import { CarroDTOStub } from "../../test/stubs/carro.dto.stub";
import { CarroAlreadyExists } from "../../test/carro-already-exists.exception";


describe("AppController", () => {
  let carroController: CarrosController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let carroModel: Model<Carro>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    carroModel = mongoConnection.model(Carro.name, CarroSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CarrosController],
      providers: [
        CarrosService,
        {provide: getModelToken(Carro.name), useValue: carroModel},
      ],
    }).compile();
    carroController = app.get<CarrosController>(CarrosController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe("postArticle", () => {
    it("should return the saved object", async () => {
      const createdArticle = await carroController.create(CarroDTOStub());
      expect(createdArticle.marca).toBe(CarroDTOStub().marca);
    });
    it("should return ArticleAlreadyExists (Bad Request - 400) exception", async () => {
      await (new carroModel(CarroDTOStub()).save());
      await expect(carroController.create(CarroDTOStub()))
        .rejects
        .toThrow(CarroAlreadyExists);
    });
  });

  describe("getArticle", () => {
    it("should return the corresponding saved object", async () => {
      await (new carroModel(CarroDTOStub()).save());
      const carro = await carroController.findOne(CarroDTOStub().id);
      expect(carro.id).toBe(CarroDTOStub().id);
    });
    it("should return null", async () => {
      const carro = await carroController.findOne(CarroDTOStub().marca);
      expect(carro).toBeNull();
    });
  });
});