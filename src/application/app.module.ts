import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './models/entity/pokemon.entity';
import { PokemonModule } from './modules/pokemon/pokemon.module';

@Module({
    imports: [
        PokemonModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'Pokedex',
            entities: [Pokemon],
            synchronize: true,
        }),
    ],
})
export class AppModule {}
