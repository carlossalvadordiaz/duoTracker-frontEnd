
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
  rango: string;
  numero_jugadores: number;
  cantidad_jugadores: number;
  jugadores_max: number;
  id_modo: number;
  nombre_modo: string;
  id: number;
  imagen_rango: string;
  registro_partida: number;
  fk_juego_rango: number;
  id_rango: number;
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

  unirPartida(registro_partida, partidaSeleccionada): any {
    return this.httpClient.post(`${this.baseUrl}/partidas/join/${registro_partida}`, partidaSeleccionada).toPromise()
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
  getPartidasFull(): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/full`).toPromise()
  }
  getPartidaById(partidaId): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/partida/${partidaId}`).toPromise()
  }

  getPartidaFullById(partidaId): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/full/${partidaId}`).toPromise()
  }

  //Pruebo a quitar el idJuego
  getPartidaFullByRegistro(registro_partida): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/full/partida/${registro_partida}`).toPromise()
  }
  getPartidasByIdModo(id_modo): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/modo/${parseInt(id_modo)}`).toPromise()
  }

  getPartidasByIdRango(id_rango): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/rango/${parseInt(id_rango)}`).toPromise()
  }

  //ORDENAR POR MAS ANTIGUAS y ID DE JUEGO

  getPartidasByAntiguas(id_juego): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/asc/${parseInt(id_juego)}`).toPromise()
  }

  getPartidasByRecientes(id_juego): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/desc/${parseInt(id_juego)}`).toPromise()
  }

}

/* /full/partida/:registro_partida */