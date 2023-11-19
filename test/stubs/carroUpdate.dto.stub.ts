import { UpdateCarroDto } from "src/carros/dto/update-carro.dto";

export const CarroUpdateDTOStub = (): UpdateCarroDto => {
  return {
    marca: 'Honda',
    modelo: "HRV",
    cor: "Preto",
    placa: "AAB7766",
    anoFabricacao: 2022
  };
};