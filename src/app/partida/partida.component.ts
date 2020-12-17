import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { PartidasService, partida } from '../servicios/partidas.service';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {


  partidaSeleccionada: partida

  datosUsuario: any

  jugadores: any[]


  //TODO Conseguir los datos del usuario, el token, e ir poniendo el username de los que se van uniendo
  //TODO HACER PUSH y corregir conflictos
  //TODO hacer que solo un usuario se pueda meter por cada partida
  //TODO ver en que partidas está cada usuario en el perfil y mostrarlas

  //!! Vigilar que cada vez que pongo algo en el constructor no reconoce partidaSeleccionada


  // *Crear un registro de partidas registro_partida
  // *El registro solo será autoincremental (+1) en la query de CREAR, no en unirse
  // *La url de las partidas tiene que enviarte al REGISTRO y no al ID de la tabla partidas
  // *Para sacar los datos de los usuarios => fk_usuario relacionarlo con el REGISTRO de la partida



  constructor(private partidasservice: PartidasService, private activatedRoute: ActivatedRoute, private usuariosservice: UsuariosService) {



  }


  async ngOnInit() {


    //!SOLO SI ESTÁ LOGADO!!!!!!!
    this.datosUsuario = await this.usuariosservice.getUsuario();
    console.log(this.datosUsuario)

    this.activatedRoute.params.subscribe(async params => {

      this.partidaSeleccionada = await this.partidasservice.getPartidaFullByRegistro(parseInt(params.registro_partida));
      /*  console.log(params) */


      /* console.log(params.registro_partida);

      console.log(this.partidaSeleccionada); */




    });

  }



  async onClick() {

    /* console.log('jugadores' + this.partidaSeleccionada.numero_jugadores);
    console.log('maximo', this.partidaSeleccionada.cantidad_jugadores);
    console.log(this.partidaSeleccionada); */



    //! Revisar esto--> en la partida solo hay un fk usuario y es el creador
    //* Obtener jugadores por partida
    //Crear tabla jugadores
    //jugadores -> id -> username -> fk partida -> fk.usuario
    // if jugadores.fk_usuario === this.datosUsuario.id ---> YA ESTAS EN LA PARTIDA
    //  Get jugadores por registropartida(partidaSeleccionada)
    //GET * from Jugadores WHERE jugadores.fk_partida === ? --> partidaSeleccionada.registro_partida
    //* Mostrar jugadores en la partida en el html
    // jugadores: any
    // this.jugadores == this.partidasservice.getjugadoresByregistroPartida(partidaSeleccionada.registro_partida)
    // *ngFor="let jugador of jugadores".... {{jugadores.username}} (click)=> routerlink['usuario'/{{jugadores.id}}]
    if (this.partidaSeleccionada.fk_usuario === this.datosUsuario.id) {
      swal.fire(
        'Ya estás en la partida',
        '...',
        'question'
      )
    }

    else if (this.partidaSeleccionada.cantidad_jugadores < this.partidaSeleccionada.numero_jugadores) {
      this.partidaSeleccionada.cantidad_jugadores++
      /* console.log(this.partidaSeleccionada); */

      const partidaUnida = await this.partidasservice.unirPartida(this.partidaSeleccionada.registro_partida, this.partidaSeleccionada)
      console.log(partidaUnida)
      swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Te has unido a la partida',
        showConfirmButton: false,
        timer: 1500
      })


      /* this.jugadores.push(this.datosUsuario.username)

      console.log(this.jugadores); */


    }



    else {
      alert('partida completa')
    }




    //insertar en la tabla un fk_usuario --> usuario logado
    //insertar +1 cantidad de jugadores

  }
}
