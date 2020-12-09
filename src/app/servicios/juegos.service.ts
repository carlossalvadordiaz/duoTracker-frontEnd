import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  baseurl: string;

  constructor(private httpClient: HttpClient) { 
    this.baseurl = "http://localhost:3000/api/"
  }

  obtenerJuegos(){
    return this.httpClient.get(`${this.baseurl}/juegos`).toPromise()
  }
}
