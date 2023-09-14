import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';


import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  private readonly defaultLimit:number;
  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    const defaultLimit = this.configService.get<number>('defaultLmit');
   }


  async create(createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {

      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;

    } catch (error) {
      this.handleException(error);
    }
  }

    
   findAll(paginationDto:PaginationDto) {
    // return 'This action returns all pokemons';

    const {limit=this.defaultLimit , offset=0} = paginationDto;
    
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset);

  }

  async findOne(terminoDeBusqueda: string) {

    let pokemon: Pokemon;

    if (!isNaN(+terminoDeBusqueda)) {
      pokemon = await this.pokemonModel.findOne({ no: terminoDeBusqueda });
    }

    //  MongoId
    if (!pokemon && isValidObjectId(terminoDeBusqueda)) {
      pokemon = await this.pokemonModel.findById(terminoDeBusqueda);
    }

    //  Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: terminoDeBusqueda.toLocaleLowerCase().trim() });
    }


    if (!pokemon) {
      throw new NotFoundException(`Pokemon whith id, name or no "${terminoDeBusqueda}" not found`);
    }

    return pokemon;

  }

  async update(terminoDeBusqueda: string, updatePokemonDto: UpdatePokemonDto) {


    const pokemon = await this.findOne(terminoDeBusqueda);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();


    try {

      await pokemon.updateOne(updatePokemonDto, { new: true })
      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error) {
      this.handleException(error);
    }
  }

  async remove( id: string) {
    // const pokemon = await this.findOne( id );
    // await pokemon.deleteOne();
    // return { id };
    // const result = await this.pokemonModel.findByIdAndDelete( id );
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if ( deletedCount === 0 )
      throw new BadRequestException(`Pokemon with id "${ id }" not found`);

    return;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in DB ${JSON.stringify(error.keyValue)}`);
    }
    // console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - check server logs`);

  }
}
