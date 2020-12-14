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



  constructor(private usuariosservice: UsuariosService, private juegosservice: JuegosService, private partidasservice: PartidasService) {




    this.mostrarForm = false
    this.mostrarDatos = true
    this.mostrarCancelar = false
    this.mostrarModificar = true
    this.mostrarGuardar = false

  }

  async ngOnInit() {

    this.arrJuegos = await this.juegosservice.obtenerJuegos();

    //Obtener datos del usuario para utilizarlos en el html
    this.usuarioDatos = await this.usuariosservice.getUsuario();
    console.log(this.usuarioDatos);



    //Devuelve un array de objetos, map y saca un array de strings
    this.arrObjetosPlataforma = await this.partidasservice.getPlataformas();


    this.arrPlataformas = this.arrObjetosPlataforma.map(p => p.plataforma_preferida)

    /* console.log(this.arrPlataformas); */
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
      id: new FormControl(this.usuarioDatos.id)
    })


  }


  async onSubmit() {


    const nuevoUsuario = await this.usuariosservice.modificarUsuario(this.formulario.value)
    console.log(this.formulario.value);
    console.log(this.usuarioDatos.id);

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
    }



    console.log(nuevoUsuario);

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



}
