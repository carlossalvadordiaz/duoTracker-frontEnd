import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { juego, JuegosService } from '../servicios/juegos.service';
import { PartidasService } from '../servicios/partidas.service';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioDatos: any

  mostrarForm: boolean
  mostrarDatos: boolean
  mostrarCancelar: boolean
  mostrarModificar: boolean
  mostrarGuardar: boolean

  arrJuegos: juego[]
  arrObjetosPlataforma: any
  arrPlataformas: string[]

  formulario: FormGroup

  arrRegistros: any



  constructor(private usuariosservice: UsuariosService, private juegosservice: JuegosService, private partidasservice: PartidasService) {

    this.mostrarForm = false
    this.mostrarDatos = true
    this.mostrarCancelar = false
    this.mostrarModificar = true
    this.mostrarGuardar = false

    this.formulario = new FormGroup({
      username: new FormControl('',
        [
          Validators.required
        ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      plataforma_preferida: new FormControl('',
        [
          Validators.required
        ]),
      juego_preferido: new FormControl('',
        [
          Validators.required
        ]),

    })

  }
  //TODO ¿COMO PONER EL VALOR DEL ID EN EL FORMCONTROL SI LO OBTENGO EN EL ONINIT

  async ngOnInit() {

    this.usuarioDatos = await this.usuariosservice.getUsuario();
    console.log(this.usuarioDatos);


    this.arrRegistros = await this.partidasservice.getRegistrosByJugador(this.usuarioDatos.id)
    console.log(this.arrRegistros);



    this.arrJuegos = await this.juegosservice.obtenerJuegos();

    //Obtener datos del usuario para utilizarlos en el html



    //Devuelve un array de objetos, map y saca un array de strings
    this.arrObjetosPlataforma = await this.partidasservice.getPlataformas();


    this.arrPlataformas = this.arrObjetosPlataforma.map(p => p.plataforma_preferida)

    /* console.log(this.arrPlataformas); */



  }

  //MODIFICAR PERFIL
  async onSubmit() {

    this.formulario.value.id = this.usuarioDatos.id

    const nuevoUsuario = await this.usuariosservice.modificarUsuario(this.formulario.value)
    console.log(this.formulario.value);
    console.log(nuevoUsuario);


    if (nuevoUsuario['error']) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Uno o más campos no son válidos',

      })
    }
    //guardar token para saber si está o no logado
    else {
      swal.fire({
        title: 'Perfil modificado correctamente',
        icon: 'success',
        confirmButtonText: 'Cool'
      }).then(function () {
        window.location.href = ''
      })
      console.log(nuevoUsuario);
    }

  }

  //Botones para modificar el formulario
  botonModificar() {
    this.mostrarForm = !this.mostrarForm;
    this.mostrarDatos = !this.mostrarDatos
    this.mostrarModificar = false
    this.mostrarGuardar = true
    this.mostrarCancelar = true


  }

  botonCancelar() {
    this.mostrarModificar = true
    this.mostrarForm = false
    this.mostrarDatos = true
    this.mostrarGuardar = false
    this.mostrarCancelar = false
  }

  //CERRAR SESION

  onClick() {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-success'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Quieres cerrar sesión?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'CERRAR',
      cancelButtonText: 'PERMANECER',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token_dt');
        swalWithBootstrapButtons.fire(
          'Has cerrado sesión'
        ).then(function () {
          window.location.href = '/home'
        })

      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'CANCELADO'
        )
      }
    })


  }



}
