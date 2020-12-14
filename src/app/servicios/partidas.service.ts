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

  baseurl: string

  constructor(private httpClient: HttpClient) {


    this.baseurl = "http://localhost:3000/api/partidas"
  }



  getPlataformas() {
    /*  const httpOptions = {
       headers: new HttpHeaders({
         'Authorization': localStorage.getItem('token_dt')
       })
     } */
    return this.httpClient.get(`${this.baseurl}/plataformas`).toPromise()
  }
}
