import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from 'src/application/models/entity/pokemon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PokemonRepository {
    constructor(
        @InjectRepository(Pokemon)
        private pokemonRepository: Repository<Pokemon>,
    ) {}

    save(pokemon: Pokemon) {
        this.pokemonRepository.save(pokemon);
    }

    async findByName(name: string): Promise<Pokemon> {
        const result = await this.pokemonRepository
            .createQueryBuilder('pokemon')
            .where('pokemon.name = :name', { name })
            .getOne();

        return result;
    }
}
