import { Component, OnInit, Input } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';
import { HttpResponse } from '@angular/common/http';



@Component({
  selector: 'pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  
  @Input() name : string;
  @Input() url : string;
  dados : any;

  constructor(private pokeapi : PokeapiService) { }

  ngOnInit() {
     this.pokeapi.consulta(this.url)
                .subscribe((dados: HttpResponse<any>) => {
                  this.dados = dados.body ;
                  console.log(this.dados);
                });
  }

}
