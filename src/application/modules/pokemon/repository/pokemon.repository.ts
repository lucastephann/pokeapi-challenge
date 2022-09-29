import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonDto } from 'src/application/models/dto/pokemon.dto';
import { Pokemon } from 'src/application/models/entity/pokemon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PokemonRepository {
    constructor(
        @InjectRepository(Pokemon)
        private pokemonRepository: Repository<Pokemon>,
    ) {}

    async save(pokemon: PokemonDto) {
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
