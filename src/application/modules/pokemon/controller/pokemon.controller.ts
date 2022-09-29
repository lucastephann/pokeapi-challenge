import { Controller, Get, Param } from '@nestjs/common';
import { PokemonDto } from 'src/application/models/dto/pokemon.dto';
import { PokemonService } from '../service/pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly service: PokemonService) {}

    @Get(':pokemonName')
    async findByName(@Param('pokemonName') pokemonName: string): Promise<PokemonDto> {
        return await this.service.getPokemonByName(pokemonName);
    }
}
