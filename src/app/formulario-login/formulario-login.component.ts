import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuariosService } from '../servicios/usuarios.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private usuariosService: UsuariosService) {

    this.formulario = new FormGroup({
      valorLogin: new FormControl(''),
      password: new FormControl(''),

    })


  }

  ngOnInit(): void {
  }
  //Logar un usuario (onsubmit)
  async onSubmit() {

    const usuario = await this.usuariosService.loginUsuario(this.formulario.value)
    console.log(usuario);

    if (usuario['error']) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña no válidos',

      })
    }
    //guardar token para saber si está o no logado
    else {
      localStorage.setItem('token_dt', usuario['token']);
      swal.fire({
        title: 'Login con exito!',
        icon: 'success',
        confirmButtonText: 'Cool'
      }).then(function () {
        window.location.href = ''
      })
    }
  }

  isLogged(on) {
    if (this.usuariosService.isLogged)
      return on

  }



}
