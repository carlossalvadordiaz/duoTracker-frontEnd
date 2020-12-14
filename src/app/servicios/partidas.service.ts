
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

export interface partida {
  id_usuario: number;
  id_juego: number;
  nombre_juego: string;
  imagen_juego: string;
  logo_juego: string;
  username: string;
  id_partida: number;
  fecha: Date;
  descripcion: string;
  fk_usuario: number;
  fk_juego: number;
  fk_modo_juego: number;
  fk_rango: number;
  id_modo: number;
  fk_juego_modo: number;
  nombre_modo: string;
  numero_jugadores: number;
  id_rango: number;
  fk_juego_rango: number;
  rango: string;
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
    return this.httpClient.post(`${this.baseUrl}/partidas`, formValues).toPromise()
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
  getPartidasFull():any{
    return this.httpClient.get(`${this.baseUrl}/partidas/full`).toPromise()
  }
}
