import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  datosUsuario: any

  token: string

  user: any

  constructor(private usuariosservice: UsuariosService) {

    this.token = localStorage.getItem('token_dt')


  }

  async ngOnInit() {

    if (this.token) {
      const usuario = await this.usuariosservice.getUsuario()

      this.datosUsuario = usuario
      console.log('USER', this.datosUsuario);
    }




    let token = localStorage.getItem('token_dt');





    /* console.log(token);  */

    /*  this.user = await this.usuariosservice.getIdByToken(token)
 
     this.idUsuario = this.user.usuarioId
 
     console.log(this.idUsuario);
 
 
     console.log(this.user);
  */




  }


  onClick() {

  }

}
