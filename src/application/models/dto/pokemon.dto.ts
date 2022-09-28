export class PokemonDto {
    name: string;
    artworkUrl: string;

    constructor(name: string, artworkUrl: string) {
        this.name = name;
        this.artworkUrl = artworkUrl;
    }
}
