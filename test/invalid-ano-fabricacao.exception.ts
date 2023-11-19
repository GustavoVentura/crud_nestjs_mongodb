import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidFabricationYear extends HttpException {
  constructor() {
    super("Ano de Fabricação Invalido, must be less than or equals to current year: " + new Date().getFullYear(), HttpStatus.BAD_REQUEST);
  }
}