import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioGeneralComponent } from './formulario-general/formulario-general.component';
import { FormularioLoginComponent } from './formulario-login/formulario-login.component';
import { HomeComponent } from './home/home.component';
import { JuegoComponent } from './juego/juego.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: FormularioGeneralComponent },
  { path: 'login', component: FormularioLoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'juego/lol', component: JuegoComponent },
  { path: 'juego/cod', component: JuegoComponent },
  { path: 'juego/fortnite', component: JuegoComponent },
  { path: 'home/juego', component: JuegoComponent },

  { path: 'registro', component: FormularioGeneralComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
