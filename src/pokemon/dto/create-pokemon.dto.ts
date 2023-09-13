import { IsPositive, IsString, MinLength, IsInt, Min } from "class-validator";

export class CreatePokemonDto {

    //isInt, isPositive, min
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    //isString, MinLength
    @IsString()
    @MinLength(1)
    name: string;
}
