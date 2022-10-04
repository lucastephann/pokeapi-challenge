import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pokemon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    artworkUrl: string;

    constructor(name: string, artworkUrl: string) {
        this.name = name;
        this.artworkUrl = artworkUrl;
    }
}
