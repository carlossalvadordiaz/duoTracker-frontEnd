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
  arr
  randomFoto: string
  partidaSeleccionada: partida

  datosUsuario: any

  jugadores: any[]

  idJuego: number

  token: string

  arrRegistros: any

  backgrounds: any

  rutaFotos: any

  foto: any


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

    /* this.rutaFotos = `../../assets/imagenes_juegos/${this.partidaSeleccionada.nombre_juego}/${this.idJuego}.jpg` */

    //OPCION 1 igualar la posicion del array al id del juego (manual)
    //OPCION 2 -> ng switch
    //OPCION 3 -> query con una tabla fotos con la ruta (?) y fk juego
    // HACER X randomJuegoFoto tantos como juegos haya y plantarlo en el html
    // 




    this.jugadores = []
  }

  async ngOnInit() {




    //!SOLO SI ESTÁ LOGADO!!!!!!!
    this.datosUsuario = await this.usuariosservice.getUsuario();
    console.log('USUARIO:', this.datosUsuario)

    this.activatedRoute.params.subscribe(async params => {
      this.partidaSeleccionada = await this.partidasservice.getPartidaFullByRegistro(parseInt(params.registro_partida));
      console.log('PARTIDA SELECCIONADA: ', this.partidaSeleccionada);
      this.randomFoto = `../../assets/imagenes_juegos/${this.partidaSeleccionada.id_juego}/${Math.floor(Math.random() * 5)}.jpg`

    });

    this.arrRegistros = await this.partidasservice.getRegistrosUnicosFull(this.idJuego);

    /* console.log(this.arrRegistros); */

    for (const registro of this.arrRegistros) {

      if (registro.registro_partida === this.partidaSeleccionada.registro_partida) {
        this.jugadores = registro.jugadores
      }
    }

    /* this.idJuego = this.partidaSeleccionada.id_juego */

  }


  async onClick() {

    console.log(this.arrRegistros);


    for (const jugador of this.partidaSeleccionada.jugadores) {


      if (jugador.id === this.datosUsuario.id) {
        return swal.fire(
          'Ya estás en la partida',
          '...',
          'question'
        )
      }

    }




    if (this.partidaSeleccionada.cantidad_jugadores < this.partidaSeleccionada.numero_jugadores) {

      /* console.log(this.partidaSeleccionada); */

      this.partidaSeleccionada.fk_usuario = this.datosUsuario.id
      const partidaUnida = await this.partidasservice.unirPartida(this.partidaSeleccionada.registro_partida, this.partidaSeleccionada)
      console.log(partidaUnida)

      const jugadorUp = await this.partidasservice.updateCantidadJugadores(this.partidaSeleccionada.registro_partida)
      console.log(jugadorUp);


      let idJuego = this.partidaSeleccionada.id_juego

      /* this.partidaSeleccionada.cantidad_jugadores++ */
      swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Te has unido a la partida',
        showConfirmButton: false,
        timer: 1500
      })

      this.partidaSeleccionada = await this.partidasservice.getPartidaFullByRegistro(this.partidaSeleccionada.registro_partida);

      /* this.jugadores.push(this.datosUsuario.username)
      console.log(this.jugadores); */
    }

    else {
      alert('partida completa')
    }




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
