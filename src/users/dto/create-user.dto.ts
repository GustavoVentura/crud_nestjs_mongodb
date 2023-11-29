import { IsDate, IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength,  Min, Max, NotEquals, IsInt } from "@nestjs/class-validator"
export class CreateUserDto {
    @IsNotEmpty()
    @IsDefined()
    @MaxLength(20)
    @IsString()    
    readonly username: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @MaxLength(20)
    readonly password: string;

    @IsNotEmpty()
    @IsDefined()
    @IsInt()
    @Max(120)
    readonly age: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @MaxLength(30)
    readonly fullName: string;

    @IsDate()
    readonly birthDate: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    readonly gender: string;
    
}
