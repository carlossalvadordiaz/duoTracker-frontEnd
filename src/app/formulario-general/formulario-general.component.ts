import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../servicios/usuarios.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import swal from 'sweetalert2'
@Component({
  selector: 'app-formulario-general',
  templateUrl: './formulario-general.component.html',
  styleUrls: ['./formulario-general.component.css']
})
export class FormularioGeneralComponent implements OnInit {

  formulario: FormGroup;
  tipoPassword: string;

  constructor(private usuarioService: UsuariosService) {
    this.tipoPassword = 'password';
    this.formulario = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/)
      ]),
      repite_password: new FormControl()

    }, [this.passwordValidator]);
  }

  ngOnInit(): void {
  }
  //*TODO Hacer funcionar las sweetAlerts en ts, meterla en el onSubmit y redireccionar a la página del perfil
  //PETICIÓN PARA AÑADIR EL USUARIO A LA DB
  async onSubmit() {
    const usuarioNuevo = await this.usuarioService.registrarUsuario(this.formulario.value)
    console.log(usuarioNuevo);
    swal.fire({
      title: 'Login con exito!',
      icon: 'success',
      confirmButtonText: 'Cool'
    })

  }

  onClick($event) {
    $event.preventDefault();
    if (this.tipoPassword === 'text') {
      this.tipoPassword = 'password';
    } else {
      this.tipoPassword = 'text';
    }
  }

  passwordValidator(form: FormGroup) {
    const passwordValue = form.get('password').value;
    const passwordRepeatValue = form.get('repite_password').value;
    if (passwordValue === passwordRepeatValue) {
      return null;
    } else {
      form.get('repite_password').setErrors({
        passwordValidator: true
      });
      return { passwordValidator: true };
    }
  }
}
