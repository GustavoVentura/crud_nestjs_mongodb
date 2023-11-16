import { CreateCarroDto } from "src/carros/dto/create-carro.dto";

export const CarroDTOStub = (): CreateCarroDto => {
  return {
    // id: 'aadfadsfi98ydfa9dajdsf',
    marca: 'Honda',
    modelo: "HRV",
    cor: "pretp",
    placa: "desconhecido",
    anoFabricacao: 2023
  };
};