import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioDatos: any

  datos: any



  constructor(private activatedroute: ActivatedRoute, private usuariosservice: UsuariosService) {
    this.usuarioDatos = this.usuariosservice.getUsuario();

  }

  async ngOnInit() {
    /* console.log('hola'); */

    this.usuarioDatos = await this.usuariosservice.getUsuario();

    console.log(this.usuarioDatos);


    //ya se pueden usar los datos del usuario en cualquier lado






  }



}
