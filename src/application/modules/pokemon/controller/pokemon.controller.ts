import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { PokemonDto } from 'src/application/models/dto/pokemon.dto';
import { PokemonService } from '../service/pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly service: PokemonService) {}

    @Get()
    findByName(@Req() request: Request): PokemonDto {
        const pokemonName = request.body.pokemonName.toLowerCase();

        return this.service.getPokemonByName(pokemonName);
    }
}
