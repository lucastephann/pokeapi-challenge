import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PokemonDto } from 'src/application/models/dto/pokemon.dto';
import { PokemonRepository } from '../repository/pokemon.repository';

@Injectable()
export class PokemonService {
    constructor(private readonly httpService: HttpService, private readonly pokemonRepository: PokemonRepository) {}

    BASE_URL = 'https://pokeapi.co/api/v2';

    getPokemonByName(name: string): PokemonDto {
        return null;
    }

    async getPokemonFromDatabase(name: string): Promise<PokemonDto> {
        return null;
    }

    async getPokemonFromPokeAPI(name: string): Promise<PokemonDto> {
        return null;
    }
}
