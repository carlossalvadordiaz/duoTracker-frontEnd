import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioGeneralComponent } from './formulario-general/formulario-general.component';
import { FormularioLoginComponent } from './formulario-login/formulario-login.component';
import { FormularioPartidaComponent } from './formulario-partida/formulario-partida.component';
import { HomeComponent } from './home/home.component';
import { JuegoComponent } from './juego/juego.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },

  { path: 'registro', component: FormularioGeneralComponent },
  { path: 'login', component: FormularioLoginComponent },
  
  { path: 'juego/:idJuego', component: JuegoComponent },


  { path: 'home/juego', component: JuegoComponent },


  { path: 'registro', component: FormularioGeneralComponent},

  { path: 'juego/:idJuego/crear', component: FormularioPartidaComponent}
  /* { path: 'home/:idJuego/crear', component: FormularioPartidaComponent} */
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
