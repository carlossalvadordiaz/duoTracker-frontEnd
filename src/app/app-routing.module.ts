import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { callbackify } from 'util';
import { CallOfDutyComponent } from './call-of-duty/call-of-duty.component';
import { FortniteComponent } from './fortnite/fortnite.component';
import { HomeComponent } from './home/home.component';
import { LeagueOfLegendsComponent } from './league-of-legends/league-of-legends.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'/home' },
  { path: 'home', component: HomeComponent },
  { path:'lol', component:LeagueOfLegendsComponent },
  { path:'cod', component:CallOfDutyComponent },
  { path:'fortnite', component:FortniteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
