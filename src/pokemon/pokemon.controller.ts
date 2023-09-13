import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Post()
  @HttpCode(HttpStatus.OK) //Para cambiar el status message
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':terminoDdeBusqueda')
  findOne(@Param('terminoDdeBusqueda') terminoDdeBusqueda: string) {
    return this.pokemonService.findOne(terminoDdeBusqueda);
  }

  @Patch(':terminoDeBusqueda')
  update(@Param('terminoDeBusqueda',) terminoDeBusqueda: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(terminoDeBusqueda, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.pokemonService.remove( id );
  }
}
