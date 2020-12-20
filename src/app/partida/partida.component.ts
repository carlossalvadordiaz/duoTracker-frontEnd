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

  arrCodFotos: any[]
  randomCodFoto: any[]
  partidaSeleccionada: partida

  datosUsuario: any

  jugadores: any[]

  idJuego: number

  token: string

  arrRegistros: any


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

    this.arrCodFotos = ["../../assets/imagenes_juegos/cod/1.jpg", "../../assets/imagenes_juegos/cod/2.jpg", "../../assets/imagenes_juegos/cod/3.webp", "../../assets/imagenes_juegos/cod/4.jpg", "../../assets/imagenes_juegos/cod/5.jpg"]

    this.randomCodFoto = this.arrCodFotos[Math.floor(Math.random() * (this.arrCodFotos.length))]



    this.jugadores = []


  }


  async ngOnInit() {

    console.log("FOTO: ", this.randomCodFoto);


    //!SOLO SI ESTÁ LOGADO!!!!!!!
    this.datosUsuario = await this.usuariosservice.getUsuario();
    console.log('USUARIO:', this.datosUsuario)

    this.activatedRoute.params.subscribe(async params => {
      this.partidaSeleccionada = await this.partidasservice.getPartidaFullByRegistro(parseInt(params.registro_partida));
      console.log('PARTIDA SELECCIONADA: ', this.partidaSeleccionada);

    });

    this.arrRegistros = await this.partidasservice.getRegistrosUnicos();

    /* console.log(this.arrRegistros); */

    for (const registro of this.arrRegistros) {

      if (registro.registro_partida === this.partidaSeleccionada.registro_partida) {
        this.jugadores = registro.jugadores
      }
    }

    /* this.idJuego = this.partidaSeleccionada.id_juego */

  }



  async onClick() {
    /* console.log(this.partidaSeleccionada); */

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

    /* const arrRegistros = await this.partidasservice.getRegistrosByPartida(this.partidaSeleccionada.registro_partida) */


    for (const registro of this.arrRegistros) {

      for (const jugador of registro.jugadores) {

        if (jugador.id === this.datosUsuario.id) {
          return swal.fire(
            'Ya estás en la partida',
            '...',
            'question'
          )
        }
      }
    }





    if (this.partidaSeleccionada.cantidad_jugadores < this.partidaSeleccionada.numero_jugadores) {

      /* console.log(this.partidaSeleccionada); */

      this.partidaSeleccionada.fk_usuario = this.datosUsuario.id
      const partidaUnida = await this.partidasservice.unirPartida(this.partidaSeleccionada.registro_partida, this.partidaSeleccionada)
      console.log(partidaUnida)

      const jugadorUp = this.partidasservice.updateCantidadJugadores(this.partidaSeleccionada.registro_partida)
      console.log(jugadorUp);


      let idJuego = this.partidaSeleccionada.id_juego

      /* this.partidaSeleccionada.cantidad_jugadores++ */
      swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Te has unido a la partida',
        showConfirmButton: false,
        timer: 1500
      })/* .then(function () {
        window.location.href = '/juego/' + idJuego
      }) */



      /* this.jugadores.push(this.datosUsuario.username)
      console.log(this.jugadores); */
    }
    else {
      alert('partida completa')
    }

    //insertar en la tabla un fk_usuario --> usuario logado
    //insertar +1 cantidad de jugadores

  }

  isLogged(): boolean {
    const isLogged = this.usuariosservice.isLogged()

    if (!isLogged) {
      return false
    }
    else {
      return true
    }
  }
}
