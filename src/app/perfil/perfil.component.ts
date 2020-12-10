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



  constructor(private activatedroute: ActivatedRoute, private usuariosservice: UsuariosService) {


  }

  async ngOnInit() {
    /* console.log('hola'); */

    this.usuarioDatos = await this.usuariosservice.getUsuario();

    console.log(this.usuarioDatos);

    //ya se pueden usar los datos del usuario en cualquier lado






  }



}
