import { IsNotEmpty, IsNumber, IsString, MaxLength, isString } from "@nestjs/class-validator";
export class CreateCarroDto {
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    readonly marca: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly modelo: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly cor: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly placa: string;

    @IsNotEmpty()
    @IsNumber()
    readonly anoFabricacao: number;
}
