import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PokemonDto } from 'src/application/models/dto/pokemon.dto';
import { PokemonRepository } from '../repository/pokemon.repository';
import { firstValueFrom, NotFoundError } from 'rxjs';

@Injectable()
export class PokemonService {
    constructor(private readonly httpService: HttpService, private readonly pokemonRepository: PokemonRepository) {}

    async getPokemonByName(name: string): Promise<PokemonDto> {
        let pokemon: PokemonDto;

        pokemon = await this.getPokemonFromDatabase(name);
        if (pokemon == null) {
            pokemon = await this.getPokemonFromPokeAPI(name);
        }

        return pokemon;
    }

    async getPokemonFromDatabase(name: string): Promise<PokemonDto> {
        let pokemon: PokemonDto;

        await this.pokemonRepository.findByName(name).then(result => {
            if (result == null) {
                return null;
            }

            pokemon = new PokemonDto(result.name, result.artworkUrl);
            console.log(`Found in the database: ${JSON.stringify(pokemon)}`);
        });

        return pokemon;
    }

    async getPokemonFromPokeAPI(name: string): Promise<PokemonDto> {
        const url = process.env.POKEAPI_BASE_URL.concat(`/pokemon/${name}`);

        try {
            const response = await firstValueFrom(this.httpService.get(url));
            const pokeName = response.data.name;
            const pokePicture = response.data.sprites.other['official-artwork'].front_default;

            const pokemon: PokemonDto = new PokemonDto(pokeName, pokePicture);
            await this.pokemonRepository.save(pokemon);

            console.log(`Found in the API: ${JSON.stringify(pokemon)}`);

            return pokemon;
        } catch (e) {
            if (e.response.status === 404) {
                throw new Error(`The Pokémon named ${name} does not exist`);
            }
            return;
        }
    }
}
