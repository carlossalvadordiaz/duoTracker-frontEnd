import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormularioGeneralComponent } from './formulario-general/formulario-general.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeagueOfLegendsComponent } from './league-of-legends/league-of-legends.component';
import { HomeComponent } from './home/home.component';
import { CallOfDutyComponent } from './call-of-duty/call-of-duty.component';
import { FortniteComponent } from './fortnite/fortnite.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FormularioGeneralComponent,
    LeagueOfLegendsComponent,
    HomeComponent,
    CallOfDutyComponent,
    FortniteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
