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


    this.datosUsuario = await this.usuariosservice.getUsuario();
    console.log(this.datosUsuario)

    this.activatedRoute.params.subscribe(async params => {
      console.log(params)
      this.partidaSeleccionada = await this.partidasservice.getPartidaFullByRegistro(params.idJuego, params.registro)
      this.partidaSeleccionada = this.partidaSeleccionada[0]
      console.log(this.partidaSeleccionada);

    });

  }



  async onClick() {
    if (this.partidaSeleccionada.fk_usuario === this.datosUsuario.id) {
      swal.fire(
        'Ya estás en la partida',

        'question'
      )
    }

    else if (this.partidaSeleccionada.cantidad_jugadores < this.partidaSeleccionada.numero_jugadores) {
      this.partidaSeleccionada.cantidad_jugadores++
      const partidaUnida = await this.partidasservice.unirPartida(this.partidaSeleccionada.id, this.partidaSeleccionada)
      console.log(partidaUnida);
      swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Te has unido a la partida',
        showConfirmButton: false,
        timer: 1500
      })

    }



    else {
      alert('partida completa')
    }




    //insertar en la tabla un fk_usuario --> usuario logado
    //insertar +1 cantidad de jugadores

  }
}
