import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

//Importar e inyectar HttpClient y realizar las peticiones
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseurl: string

  loginUrl: string

  constructor(private httpClient: HttpClient) {
    this.baseurl = "http://localhost:3000/api/usuarios"

    this.loginUrl = "http://localhost:3000/api/login"
  }


  //Las peticiones post necesitan el body, en este caso, el valor del formulario de registro

  getUsuarioById(idUsuario) {
    return this.httpClient.get(`${this.baseurl}/${idUsuario}`).toPromise()
  }

  registrarUsuario(formValues) {
    console.log(formValues);
    
    return this.httpClient.post(`${this.loginUrl}/registro`, formValues).toPromise()
  }

  loginUsuario(formValues) {
    return this.httpClient.post(this.loginUrl, formValues).toPromise()
  }

  isLogged(): boolean {
    if (localStorage.getItem('token_dt')) {
      return true;
    } else {
      return false
    }
  }

  getUsuario() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_dt')
      })
    }
    return this.httpClient.get(`${this.baseurl}/user`, httpOptions).toPromise()
  }
  //obtener el ID del usuario mediante el token --> en cada sitio que lo requiera
  /*   getIdByToken(token) {
      return this.httpClient.post(`${this.baseurl}/token`, { token: token }).toPromise();
  
    } */
}

