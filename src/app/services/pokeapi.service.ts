import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PokeapiService {

  constructor (private httpClient: HttpClient) {
  }
<<<<<<< HEAD
  URL = 'https://pokeapi.co/api/v2/pokemon';
=======
  URL = 'http://pokeapi.co/api/v2/pokemon';
>>>>>>> parent of 8400a47f... Auto-generated commit

  lista(): Observable<Object> {
     return this.httpClient.get(this.URL, { observe: 'response'}) ;
  }
  consulta(url): Observable<Object> {
    return this.httpClient.get(url, {observe: 'response'}) ;
  }
  pokemon(id): Observable<Object> {
    return this.httpClient.get(`${this.URL}/${id}`, {observe: 'response'}) ;
  }
}
