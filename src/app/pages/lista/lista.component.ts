import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http'

import { PokemonModule } from '../../components/pokemon/pokemon.module'

import { PokeapiService } from '../../services/pokeapi.service'



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  title: string = 'Pokedex';
  pokemons: Array<any> = [ ];
  pokemonsPorPagina: number = 0;
  total: number = 0;
  proximo: string = null;
  anterior: string = null;
  paginas: number = 0;

  
  constructor(private pokeapi : PokeapiService) { 
    this.listar();
  }

  ngOnInit() {
      
  }

  setPokemonsPorPagina() {
    this.paginas = this.total / this.pokemonsPorPagina;
  }

  listar() {
    this.pokeapi.lista()
    .subscribe((dados: HttpResponse<any>) => {
      let response = dados.body;
      this.pokemons = response.results ;
      this.total = response.count;
      this.proximo = response.next;
      this.anterior = response.previous;
    });
  }
  proximaPagina() {
    this.pokeapi.consulta(this.proximo)
    .subscribe((dados: HttpResponse<any>) => {
      let response = dados.body;
      this.pokemons = response.results ;
      this.total = response.count;
      this.proximo = response.next;
      this.anterior = response.previous;
      window.scroll(0,0);
    });
    
  }
  paginaAnterior() {
    this.pokeapi.consulta(this.anterior)
    .subscribe((dados: HttpResponse<any>) => {
      let response = dados.body;
      this.pokemons = response.results ;
      this.total = response.count;
      this.proximo = response.next;
      this.anterior = response.previous;
      window.scroll(0,0);
    });
    
  }
}
