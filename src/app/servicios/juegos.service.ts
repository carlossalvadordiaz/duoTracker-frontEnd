import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

  export interface juego {
    id: number;
    nombre: string;
    imagen: string;
  }

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  baseurl: string;

  constructor(private httpClient: HttpClient) { 
    this.baseurl = "http://localhost:3000/api"
  }

  obtenerJuegos():any {
    return this.httpClient.get(`${this.baseurl}/juegos`).toPromise()
  }
  obtenerModos(idJuego):any {
    return this.httpClient.get(`${this.baseurl}/juegos/${idJuego}/modos`).toPromise()
  }
  obtenerRangos(idJuego):any {
    return this.httpClient.get(`${this.baseurl}/juegos/${idJuego}/rangos`).toPromise()
  }
}

