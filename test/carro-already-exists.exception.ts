import { HttpException, HttpStatus } from "@nestjs/common";

export class CarroAlreadyExists extends HttpException {
  constructor() {
    super("Carro already exists!", HttpStatus.BAD_REQUEST);
  }
}