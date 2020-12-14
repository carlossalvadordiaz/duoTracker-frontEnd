import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "http://localhost:3000/api/partidas"
   }

   guardarPartida(formValues):any {
    return this.httpClient.post(`${this.baseUrl}`, formValues).toPromise()
   }
}
