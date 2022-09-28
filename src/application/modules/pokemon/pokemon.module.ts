import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokemonController } from './controller/pokemon.controller';
import { PokemonService } from './service/pokemon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from 'src/application/models/entity/pokemon.entity';
import { PokemonRepository } from './repository/pokemon.repository';

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([Pokemon])],
    controllers: [PokemonController],
    providers: [PokemonService, PokemonRepository],
})
export class PokemonModule {}
