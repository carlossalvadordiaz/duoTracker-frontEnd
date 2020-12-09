import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioGeneralComponent } from './formulario-general/formulario-general.component';
<<<<<<< HEAD
import { FormularioLoginComponent } from './formulario-login/formulario-login.component';
=======
>>>>>>> d9da138b5dc255e6db7351522e63a40fd0d5de14
import { HomeComponent } from './home/home.component';
import { JuegoComponent } from './juego/juego.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
<<<<<<< HEAD
  { path: 'registro', component: FormularioGeneralComponent },
  { path: 'login', component: FormularioLoginComponent },
  { path: 'juego/lol', component: JuegoComponent },
  { path: 'juego/cod', component: JuegoComponent },
  { path: 'juego/fortnite', component: JuegoComponent }
=======
  { path: 'home/juego', component: JuegoComponent },

  { path: 'registro', component: FormularioGeneralComponent}
>>>>>>> d9da138b5dc255e6db7351522e63a40fd0d5de14
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
