import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ListaComponent } from './pages/lista/lista.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { Page404Component } from './pages/page404/page404.component';
import { PokeapiService } from './services/pokeapi.service';
import { roteamento } from './routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonModule } from './components/pokemon/pokemon.module';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    DetalhesComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PokemonModule,
    FormsModule,
    ReactiveFormsModule,
    roteamento
  ],
  providers: [
    PokeapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
