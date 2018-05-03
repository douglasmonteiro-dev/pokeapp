import { Routes, RouterModule } from '@angular/router';

import { Page404Component } from './pages/page404/page404.component';
import { ListaComponent } from './pages/lista/lista.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';

const rotasDaApp: Routes = [
    {path: '', component: ListaComponent},
    {path: 'detalhes/:_id', component: DetalhesComponent},
    {path: '**', component: Page404Component }
];

export const roteamento = RouterModule.forRoot(rotasDaApp);