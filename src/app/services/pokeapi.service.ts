import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { PokemonComponent } from '../components/pokemon/pokemon.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PokeapiService {

  constructor (private httpClient: HttpClient) {
        
  }
  URL: string = 'http://pokeapi.co/api/v2/pokemon';
  

  lista() : Observable<Object> {
     return this.httpClient.get(this.URL, { observe: 'response'}) ;
  }
  consulta(url) : Observable<Object> {
    return this.httpClient.get(url, {observe: 'response'}) ;
  }
  pokemon(id) : Observable<Object> {
    return this.httpClient.get(`${this.URL}/${id}`, {observe: 'response'}) ;
  }
}
