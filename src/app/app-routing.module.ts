import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioGeneralComponent } from './formulario-general/formulario-general.component';
import { FormularioPartidaComponent } from './formulario-partida/formulario-partida.component';
import { HomeComponent } from './home/home.component';
import { JuegoComponent } from './juego/juego.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'home/juego', component: JuegoComponent },

  { path: 'registro', component: FormularioGeneralComponent},
  { path: 'home/juego/crear', component:FormularioPartidaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
