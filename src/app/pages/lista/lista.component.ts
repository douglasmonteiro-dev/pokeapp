import { Component, OnInit, HostListener } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { PokeapiService } from '../../services/pokeapi.service';



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  title = 'Pokedex';
  pokemons: Array<any> = [ ];
  pokemonsPorPagina = 0;
  total = 0;
  proximo: string = null;
  anterior: string = null;
  paginas = 0;

  constructor(private pokeapi: PokeapiService) {
    this.listar();
  }

  ngOnInit() {
  }
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.proximaPagina();
    }
  }
  setPokemonsPorPagina() {
    this.paginas = this.total / this.pokemonsPorPagina;
  }

  listar() {
    this.pokeapi.lista()
    .subscribe((dados: HttpResponse<any>) => {
      const response = dados.body;
      this.pokemons = response.results ;
      this.total = response.count;
      this.proximo = response.next;
      this.anterior = response.previous;
    });
  }
  proximaPagina() {
    this.pokeapi.consulta(this.proximo)
    .subscribe((dados: HttpResponse<any>) => {
      const response = dados.body;
      this.pokemons = this.pokemons.concat(response.results);
      this.total = response.count;
      this.proximo = response.next;
      this.anterior = response.previous;
    });
  }
  paginaAnterior() {
    this.pokeapi.consulta(this.anterior)
    .subscribe((dados: HttpResponse<any>) => {
      const response = dados.body;
      this.pokemons = response.results ;
      this.total = response.count;
      this.proximo = response.next;
      this.anterior = response.previous;
      window.scroll(0, 0);
    });
  }
  scrollTop() {
    window.scroll(0, 0);
  }
}
