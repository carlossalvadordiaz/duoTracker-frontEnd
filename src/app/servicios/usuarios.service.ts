import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

//Importar e inyectar HttpClient y realizar las peticiones
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseurl: string

  constructor(private httpClient: HttpClient) {
    this.baseurl = "http://localhost:3000/api/usuarios"
  }


  //Las peticiones post necesitan el body, en este caso, el valor del formulario de registro

  registrarUsuario(formValues) {
    return this.httpClient.post(`${this.baseurl}/registro`, formValues).toPromise()
  }
}
