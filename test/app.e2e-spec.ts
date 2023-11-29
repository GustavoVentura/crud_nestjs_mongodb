import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  } )


  describe('Carros E2E Tests', () => {
    const E2E_APP_URL='/carros'

    it('get /carros -> Deve Retornar uma NotFoundException e statusCode 204', async () => {
      return await request(app.getHttpServer())
        .get('/carros')
        .expect(404);
    });

    it('post /carros -> Deve Retornar um objeto carro e statusCode 200', async () => {
      return await request(app.getHttpServer()).post(E2E_APP_URL)
      .send({
        marca: 'Fiat',
        modelo: "Grand Siena",
        cor: "Branco",
        placa: "LLW8387",
        anoFabricacao: 2013
      }).expect(201)
    })

    it('get /carros -> Deve Retornar uma lista de carros e statusCode 200', async () => {
      return await request(app.getHttpServer())
        .get('/carros')
        .expect(200);
    });

    it('get carros/placa -> Deve retornar NotFoundException e statusCode 404 ', async () => {
      return await request(app.getHttpServer())
        .get('/carros/XXDDBB')
        .expect(404);
    });

    it('post /carros -> Deve Retornar InvalidFabricationYear e statusCode 400', async () => {
      return await request(app.getHttpServer()).post(E2E_APP_URL)
      .send({
        marca: 'Fiat',
        modelo: "Grand Siena",
        cor: "Branco",
        placa: "LLW8388",
        anoFabricacao: 2035
      }).expect(400)
    })

    it('post /carros -> Deve Retornar ValidationException e statusCode 400', async () => {
      return await request(app.getHttpServer()).post(E2E_APP_URL)
      .send({
        marca: 'Fiat',
        modelo: "Grand Siena",
        anoFabricacao: 2013
      }).expect(400)
    })

})
});
