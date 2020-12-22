
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
  jugadores: any[]
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

  updateCantidadJugadores(registro_partida): any {
    return this.httpClient.put(`${this.baseUrl}/partidas/update/`, { registro_partida }).toPromise()
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

  getPartidaFullByRegistro(registro_partida): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/full/partida/${registro_partida}`).toPromise()
  }

  getPartidasByIdRango(id_juego, id_rango, pagina): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/rg/rango/${id_juego}/${parseInt(id_rango)}/${pagina}`).toPromise()
  }

  //ORDENAR POR MAS ANTIGUAS y ID DE JUEGO

  getPartidasByAntiguas(id_juego, pagina): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/asc/${parseInt(id_juego)}/${pagina}`).toPromise()
  }

  getPartidasByRecientes(id_juego, pagina): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/desc/${parseInt(id_juego)}/${pagina}`).toPromise()
  }

  getRegistrosByPartida(registro_partida): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/registro/${parseInt(registro_partida)}`).toPromise()
  }

  getPartidasPagina(idJuego, pagina): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/pagina/${idJuego}/${pagina}`).toPromise()
  }

  getRegistrosUnicosFull(idJuego): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/rg/${idJuego}`).toPromise()
  }

  getRegistrosUnicos(idJuego, pagina): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/rg/${idJuego}/${pagina}`).toPromise()
  }

  getPartidasAsc(idJuego, pagina): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/rg/asc/${idJuego}/${pagina}`).toPromise()
  }

  getRegistrosByIdModo(idJuego, idModo, pagina): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/rg/modo/${idJuego}/${idModo}/${pagina}`).toPromise()
  }

  getRegistrosByJugador(idUsuario): any {
    return this.httpClient.get(`${this.baseUrl}/partidas/jugador/${idUsuario}`).toPromise()
  }


}

/* /full/partida/:registro_partida */