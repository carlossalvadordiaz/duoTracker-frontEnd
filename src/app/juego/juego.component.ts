import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { JuegosService, rangos } from '../servicios/juegos.service';
import { partida, PartidasService } from '../servicios/partidas.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  idJuego: number;
  arrPartidas: partida[];
  partidaSeleccionada: any
  arrJuegos: any[]
  arrPartidasByJuego: any[]
  arrModosByJuego: any[]
  arrPartidasByModo: any[]
  arrRangosByJuego: any[]
  idModos: any[];
  arrPartidasAntiguas: any[];
  arrPartidasRecientes: any[]

  constructor(private partidasservice: PartidasService, private juegosservice: JuegosService, private activatedRoute: ActivatedRoute) {
    this.arrPartidas = [];
    this.arrJuegos = []
    this.arrPartidasByJuego = []
    this.arrModosByJuego = []
    this.arrPartidasByModo = []

  }

  async ngOnInit() {

    const juegos = await this.juegosservice.obtenerJuegos();

    this.arrJuegos = juegos

    console.log(this.arrJuegos);



    this.activatedRoute.params.subscribe(async params => {
      /*       console.log(params); */
      this.idJuego = parseInt(params.idJuego);
    });
    //GET MODOS by id juego
    this.juegosservice.obtenerModos(this.idJuego)
      .then(modo => {
        this.arrModosByJuego = modo;
      })
      .catch(error => console.log(error)
      );
    //GET RANGOS by id juego
    const rangosByJuego = await this.juegosservice.obtenerRangos(this.idJuego)
    this.arrRangosByJuego = rangosByJuego

    this.partidasservice.getPartidasFull()
      .then(partida => {
        this.arrPartidas = partida;

        this.arrPartidasByJuego = this.arrPartidas.filter(p => p.id_juego === this.idJuego)
        this.idModos = this.arrPartidasByJuego.map(m => m.id_modo)

      })
      .catch(error => console.log(error)
      );

    //ORDENADAS POR FECHA


  }


  async onChange($event) {

    const partidas = await this.partidasservice.getPartidasByIdModo($event.target.value)
    console.log(partidas);

    this.arrPartidasByJuego = partidas

  }

  async onChangeRangos($event) {
    const partidas = await this.partidasservice.getPartidasByIdRango($event.target.value)

    this.arrPartidasByJuego = partidas
  }

  async onChangeFechas($event) {

    if ($event.target.value === "A") {
      const partidasAntiguas = await this.partidasservice.getPartidasByAntiguas(this.idJuego)
      this.arrPartidasByJuego = partidasAntiguas
      console.log(partidasAntiguas);

    }
    else {
      const partidasRecientes = await this.partidasservice.getPartidasByRecientes(this.idJuego)
      this.arrPartidasByJuego = partidasRecientes
    }
  }


}
