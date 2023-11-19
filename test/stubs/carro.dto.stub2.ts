import { CreateCarroDto } from "src/carros/dto/create-carro.dto";

export const CarroDTOStub2 = (): CreateCarroDto => {
  return {
    marca: 'Fiat',
    modelo: "Grand Siena",
    cor: "Branco",
    placa: "AAB7766",
    anoFabricacao: 2013
  };
};