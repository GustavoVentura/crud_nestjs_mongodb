import { CreateCarroDto } from "src/carros/dto/create-carro.dto";

export const CarroDTOStub = (): CreateCarroDto => {
  return {
    marca: 'Honda',
    modelo: "HRV",
    cor: "Preto",
    placa: "LLW9988",
    anoFabricacao: 2023
  };
};