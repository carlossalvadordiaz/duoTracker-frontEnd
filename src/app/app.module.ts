import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormularioGeneralComponent } from './formulario-general/formulario-general.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { JuegoComponent } from './juego/juego.component';

import { FormularioLoginComponent } from './formulario-login/formulario-login.component';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { FormularioPartidaComponent } from './formulario-partida/formulario-partida.component';

import { PerfilComponent } from './perfil/perfil.component';
import { PartidaComponent } from './partida/partida.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FormularioGeneralComponent,
    HomeComponent,
    FooterComponent,
    JuegoComponent,
    FormularioLoginComponent,
    FormularioPartidaComponent,
    FormularioLoginComponent,
    PerfilComponent,
    PartidaComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
