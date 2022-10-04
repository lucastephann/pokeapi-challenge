import { PokemonDto } from 'src/application/models/dto/pokemon.dto';
import { PokemonRepository } from '../repository/pokemon.repository';
import { PokemonService } from './pokemon.service';
import { mock } from 'jest-mock-extended';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { Pokemon } from '../../../models/entity/pokemon.entity';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';

function mockPokemonReturn(overwrite: Partial<AxiosResponse> = {}): AxiosResponse {
    return {
        data: {
            name: 'Pokemon',
            sprites: {
                other: {
                    ['official-artwork']: {
                        front_default: 'http://localhost',
                    },
                },
            },
        },
        config: {},
        headers: {},
        status: 200,
        statusText: 'OK',
        ...overwrite,
    };
}

describe('PokemonService', () => {
    process.env.POKEAPI_BASE_URL = 'https://mockurl.com';

    const httpService = mock<HttpService>();
    const pokemonRepository = mock<PokemonRepository>();

    function createPokemonService(): PokemonService {
        return new PokemonService(httpService, pokemonRepository);
    }

    beforeEach(async () => {
        jest.resetAllMocks();
    });

    describe('getPokemonByName', () => {
        it('should return pokemon by name, fetched from API', async () => {
            const service = createPokemonService();

            const expectedPokemon = new PokemonDto('Pokemon', 'http://localhost');

            pokemonRepository.findByName.mockResolvedValue(null);
            httpService.get.mockImplementationOnce(() => of(mockPokemonReturn()));

            const result = await service.getPokemonByName('name');

            expect(result).toStrictEqual(expectedPokemon);
            expect(pokemonRepository.save).toHaveBeenCalledTimes(1);
        });

        it('should return pokemon by name, fetched from Database', async () => {
            const service = createPokemonService();

            const expectedPokemon = new Pokemon('Pokemon', 'http://localhost');

            pokemonRepository.findByName.mockResolvedValue(expectedPokemon);

            const result = await service.getPokemonByName('name');

            expect(result).toEqual(expectedPokemon as PokemonDto);
            expect(pokemonRepository.save).toHaveBeenCalledTimes(0);
        });
    });
});
