import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrosService } from './carros.service';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';

@Controller('carros')
export class CarrosController {
  constructor(private readonly carrosService: CarrosService) {}

  @Post()
  create(@Body() createCarroDto: CreateCarroDto) {
    return this.carrosService.create(createCarroDto);
  }

  @Get()
  findAll() {
    return this.carrosService.findAll();
  }

  @Get(':placa')
  findOne(@Param('placa') placa: string) {
    return this.carrosService.findOne(placa);
  }

  // @Get(':placa')
  // findbyPlaca(@Param('placa') placa: string) {
  //   return this.carrosService.findOne(placa);
  // }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarroDto: UpdateCarroDto) {
    console.log(id)
    return this.carrosService.update(id, updateCarroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrosService.remove(id);
  }
}
