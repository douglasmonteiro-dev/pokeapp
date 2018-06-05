import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeapiService } from '../../services/pokeapi.service';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  name : string;
  url : string;
  pokemon : any;

  constructor(private pokeapi : PokeapiService, private rota : ActivatedRoute, private router : Router) {
    rota.params.subscribe((parametros) => {
      const url = parametros.url;
      const name = parametros.name;
      if(url && name) {
        this.name = name;
        this.url = url;
      }
    });
   }

  ngOnInit() {
    this.consultar(this.url);
  }

  consultar (url) {
    this.pokeapi.consulta(url)
    .subscribe((dados: HttpResponse<any>) => {
      let response = dados.body;
      this.pokemon = response;
    });
  }

}
