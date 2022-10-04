import { Test, TestingModule } from '@nestjs/testing';

import { PokemonController } from './pokemon.controller';
import { PokemonDto } from 'src/application/models/dto/pokemon.dto';
import { PokemonService } from '../service/pokemon.service';

describe('PokemonController', () => {
    let controller: PokemonController;
    let service: PokemonService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PokemonController],
            providers: [PokemonService],
        }).compile();

        controller = module.get<PokemonController>(PokemonController);
        service = module.get<PokemonService>(PokemonService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should find by name', async () => {
        const result = new Promise<PokemonDto>(() => {
            return new PokemonDto('mockName', 'mockUrl');
        });

        jest.spyOn(service, 'getPokemonByName').mockImplementation(() => result);

        expect(await controller.findByName('name')).toBe(result);
    });
});
