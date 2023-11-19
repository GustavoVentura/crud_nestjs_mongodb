import { CreateCarroDto } from "src/carros/dto/create-carro.dto";

export const CarroDTOStubInvalidFabricationYear = (): CreateCarroDto => {
  return {
    marca: 'Honda',
    modelo: "HRV",
    cor: "pretp",
    placa: "LLW9988",
    anoFabricacao: 2024
  };
};