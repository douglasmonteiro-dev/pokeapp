import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { Page404Component } from './page404/page404.component';
import { PokemonModule } from '../components/pokemon/pokemon.module';
import { roteamento } from '../routing';
import {MatToolbarModule, MatButtonModule, MatIconModule} from '@angular/material';


@NgModule({
  declarations: [
    ListaComponent,
    DetalhesComponent,
    Page404Component
  ],
  imports: [
    CommonModule,
    PokemonModule,
    roteamento,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PagesModule { }
