import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { Pokemon } from './models/entity/pokemon.entity';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PokemonModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            entities: [Pokemon],
            synchronize: true,
        }),
    ],
})
export class AppModule {}
