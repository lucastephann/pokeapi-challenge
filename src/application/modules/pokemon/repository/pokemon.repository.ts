import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PokemonDto } from 'src/application/models/dto/pokemon.dto';
import { Pokemon } from 'src/application/models/entity/pokemon.entity';

@Injectable()
export class PokemonRepository {
    constructor(
        @InjectRepository(Pokemon)
        private pokemonRepository: Repository<Pokemon>,
    ) {}

    async save(pokemon: PokemonDto) {
        await this.pokemonRepository.save(pokemon);
    }

    async findByName(name: string): Promise<Pokemon> {
        return await this.pokemonRepository
            .createQueryBuilder('pokemon')
            .where('pokemon.name = :name', { name })
            .getOne();
    }
}
