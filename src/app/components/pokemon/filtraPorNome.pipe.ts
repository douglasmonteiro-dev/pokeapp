import { Pipe } from '@angular/core'
import { PokemonComponent } from '../pokemon/pokemon.component';

@Pipe({
    name: 'filtraPorNome'
})

export class FiltraPorNomePipe {
    transform(pokemons : any, inputDoUsuario) {
        
            return pokemons.filter((pokemon) => {
                if (pokemon.name) {
                return pokemon.name
                    .toLowerCase()
                    .includes(inputDoUsuario.toLowerCase())
            }
            return true
        })
    }
}