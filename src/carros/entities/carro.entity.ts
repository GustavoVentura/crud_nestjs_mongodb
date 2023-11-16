import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarroDocument = Carro & Document;

@Schema()
export class Carro {
  @Prop()
  marca: string;

  @Prop()
  modelo: String;

  @Prop()
  cor: String;

  @Prop()
  placa: String;

  @Prop()
  anoFabricacao: Number;
}

export const CarroSchema = SchemaFactory.createForClass(Carro);