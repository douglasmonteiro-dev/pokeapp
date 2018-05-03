import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http'

import { PokemonModule } from '../../components/pokemon/pokemon.module'
import { PokemonComponent } from '../../components/pokemon/pokemon.component';

import { PokeapiService } from '../../services/pokeapi.service'



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  title: string = "Pokedex";
  pokemons: Array<PokemonComponent> = [ ];
  
  constructor(private pokeapi : PokeapiService) { }

  ngOnInit() {
      this.pokeapi.lista()
                .subscribe((dados: HttpResponse<any>) => {
                  console.log(dados);
                  let response = dados.body;
                  this.pokemons = response.results ;

                });
  }

}
