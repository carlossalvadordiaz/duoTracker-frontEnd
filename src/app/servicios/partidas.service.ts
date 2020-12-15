
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

export interface partida {
  id: number;
  fecha: Date;
  descripcion: string;
  fk_usuario: number;
  fk_juego: number;
  fk_modo_juego: number;
  fk_rango: number;
  nombre_juego: string;
  rango: string;
  numero_jugadores: number;
  username: string;
  imagen_juego: string;
  logo_juego: string;
  cantidad_jugadores: number;
  jugadores_max: number;
  id_juego: number;
  id_partida: number;
}


@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "http://localhost:3000/api"
  }

  guardarPartida(formValues): any {
    return this.httpClient.post(`${this.baseUrl}/partidas`, formValues).toPromise()
  }

  unirPartida(partidaId, partidaSeleccionada): any {
    return this.httpClient.post(`${this.baseUrl}/partidas/join/${partidaId}`, partidaSeleccionada).toPromise()
  }

  getPlataformas() {
    /*  const httpOptions = {
       headers: new HttpHeaders({
         'Authorization': localStorage.getItem('token_dt')
       })
     } */
    return this.httpClient.get(`${this.baseUrl}/partidas/plataformas`).toPromise()
  }

  getPartidas(): any {
    return this.httpClient.get(`${this.baseUrl}/partidas`).toPromise()
  }

  getPartidaById(partidaId): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/partida/${partidaId}`).toPromise()
  }

  getPartidaFullById(partidaId): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/full/${partidaId}`).toPromise()
  }

  getPartidaFullByRegistro(idJuego, registro): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/:${idJuego}/${registro}`).toPromise()
  }
}
