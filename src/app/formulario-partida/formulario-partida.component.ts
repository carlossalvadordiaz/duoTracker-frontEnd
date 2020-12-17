import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { juego, JuegosService, modos, rangos } from '../servicios/juegos.service';
import { PartidasService } from '../servicios/partidas.service';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-formulario-partida',
  templateUrl: './formulario-partida.component.html',
  styleUrls: ['./formulario-partida.component.css']
})
export class FormularioPartidaComponent implements OnInit {

  arrJuegos: juego[];
  formulario: FormGroup;
  arrModos: modos[];
  arrRangos: rangos[];
  idJuego: number;
  datosUsuario: any;
  idUsuario: number;
  formValues: any[];

  /* registro_partida: number; */

  constructor(private juegosService: JuegosService, private activatedRoute: ActivatedRoute, private usuariosservice: UsuariosService, private partidasservice: PartidasService) {
    this.arrJuegos = []
    this.arrModos = []
    this.arrRangos = []
    this.formValues = []

    /* this.registro_partida = Math.random() * 10000 */







    this.formulario = new FormGroup({
      /*  usuario: new FormControl('',[Validators.required]), */
      fecha: new FormControl('', [Validators.required]),
      descripcion: new FormControl(),
      fk_modo_juego: new FormControl(''),
      fk_rango: new FormControl(''),
      fk_juego: new FormControl(''),
      fk_usuario: new FormControl(''),
      cantidad_jugadores: new FormControl(1),
      registro_partida: new FormControl(Math.random() * 100000000)

      /* registro_partida: new FormControl(this.formulario.value.registro_partida) */
    })

  }
  //! CREAR REGISTRO 
  async ngOnInit() {

    this.datosUsuario = await this.usuariosservice.getUsuario()
    this.idUsuario = this.datosUsuario.id;


    this.juegosService.obtenerJuegos()
      .then(juego => {
        this.arrJuegos = juego;
      })
      .catch(error => console.log(error));

    this.activatedRoute.params.subscribe(params => {
      this.idJuego = params.idJuego;
      /*      console.log(this.idJuego); */

      this.juegosService.obtenerModos(params.idJuego)
        .then(modo => {
          this.arrModos = modo;
        })
        .catch(error => console.log(error)
        );

      this.activatedRoute.params.subscribe(params => {
        this.juegosService.obtenerRangos(params.idJuego)
          .then(rango => {
            this.arrRangos = rango;
          })
          .catch(error => console.log(error)
          );
      })

    })


  }

  async onSubmit() {
    /* console.log(this.formulario.value); */
    /*     this.partidasservice.guardarPartida(this.formulario.value)
           .then(partida => {
            partida = this.formulario.value;
            console.log(partida);
          })  */

    const fk_modo_juego = this.formulario.value.fk_modo_juego.split('_')[0];
    const jugadores_max = this.formulario.value.fk_modo_juego.split('_')[1];




    this.formulario.value.fk_modo_juego = fk_modo_juego
    this.formulario.value.jugadores_max = jugadores_max
    /* console.log(this.formulario.value); */

    const nuevaPartida = await this.partidasservice.guardarPartida(this.formulario.value)
    console.log(nuevaPartida);

    swal.fire({
      title: 'Partida Creada!',
      icon: 'success',
      confirmButtonText: 'Cool'
    }).then(function () {
      window.location.href = '/juego/' + nuevaPartida.fk_juego
    })



  }

}
