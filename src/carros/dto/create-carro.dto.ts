import { IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength,  Min,  min } from "@nestjs/class-validator"
import { Max } from "class-validator";
export class CreateCarroDto {
    @IsNotEmpty()
    @IsDefined()
    @MaxLength(20)
    @IsString()    
    readonly marca: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @MaxLength(20)
    readonly modelo: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @MaxLength(20)
    readonly cor: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @MaxLength(20)
    readonly placa: string;

    @IsNotEmpty()
    @IsDefined()
    @IsNumber()
    @Min(1886)
    @Max(new Date().getFullYear())
    readonly anoFabricacao: number;
}
