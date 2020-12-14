import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

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
