
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

export interface partida {
  id: number;
  fecha: Date;
  descripcion: string;
  fk_usuario: number;
  fk_juego: number;
  fk_modo_juego: number;
}

@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "http://localhost:3000/api"
   }

   guardarPartida(formValues):any {
    return this.httpClient.post(`${this.baseUrl}`, formValues).toPromise()
   }
   
  getPlataformas() {
    /*  const httpOptions = {
       headers: new HttpHeaders({
         'Authorization': localStorage.getItem('token_dt')
       })
     } */
    return this.httpClient.get(`${this.baseUrl}/plataformas`).toPromise()
  }

  getPartidas():any {
    return this.httpClient.get(`${this.baseUrl}/partidas`).toPromise()
  }
}
