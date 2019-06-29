import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { FiltraPorNomePipe } from './filtraPorNome.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PokemonComponent,
    FiltraPorNomePipe
  ],
  exports: [
    PokemonComponent,
    FiltraPorNomePipe
  ]
})
export class PokemonModule { }
