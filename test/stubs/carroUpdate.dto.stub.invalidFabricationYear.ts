import { UpdateCarroDto } from "src/carros/dto/update-carro.dto";

export const CarroUpdateDTOInvalidFabricationYearStub = (): UpdateCarroDto => {
  return {
    marca: 'Honda',
    modelo: "HRV",
    cor: "Preto",
    anoFabricacao: 2025
  };
};