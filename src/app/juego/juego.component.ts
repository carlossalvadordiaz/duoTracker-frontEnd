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
  partidasfiltradas: any[]
  arrRegistros: any[]

  pagina: number

  constructor(private partidasservice: PartidasService, private juegosservice: JuegosService, private activatedRoute: ActivatedRoute) {
    this.arrPartidas = [];
    this.arrJuegos = []
    this.arrPartidasByJuego = []
    this.arrModosByJuego = []
    this.arrPartidasByModo = []
    this.pagina = 1

  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {

      this.idJuego = parseInt(params.idJuego);
      console.log('idJuego: ', this.idJuego);

      const registros = await this.partidasservice.getRegistrosUnicos(this.idJuego, this.pagina);
      console.log(registros);

      this.arrPartidasByJuego = registros

      console.log(this.arrPartidasByJuego);


      const juegos = await this.juegosservice.obtenerJuegos();

      this.arrJuegos = juegos

      this.arrModosByJuego = await this.juegosservice.obtenerModos(this.idJuego)

      this.arrRangosByJuego = await this.juegosservice.obtenerRangos(this.idJuego)




    });


  }

  //TODO ARREGLAR LA QUERY RE REGISTROS Y HACER QUE NO SE REPITAN

  async onChange($event) {

    const partidasModo = await this.partidasservice.getRegistrosByIdModo(this.idJuego, $event.target.value, this.pagina)

    this.arrPartidasByJuego = partidasModo

  }

  async onChangeRangos($event) {
    const partidas = await this.partidasservice.getPartidasByIdRango(this.idJuego, $event.target.value, this.pagina)

    this.arrPartidasByJuego = partidas
  }

  async onChangeFechas($event) {

    if ($event.target.value === "A") {
      const partidasAntiguas = await this.partidasservice.getPartidasAsc(this.idJuego, this.pagina)
      this.arrPartidasByJuego = partidasAntiguas
      console.log(partidasAntiguas);

    }
    else {
      const partidasRecientes = await this.partidasservice.getRegistrosUnicos(this.idJuego, this.pagina)
      this.arrPartidasByJuego = partidasRecientes
    }
  }

  async onClick(siguiente) {
    if (siguiente) { this.pagina++ }
    else { this.pagina-- }

    const partidasPagina = await this.partidasservice.getRegistrosUnicos(this.idJuego, this.pagina)
    this.arrPartidasByJuego = partidasPagina

    window.scrollTo({ top: 50, behavior: 'smooth' });

    console.log(partidasPagina);

  }

  async onClickAll() {
    this.arrPartidasByJuego = await this.partidasservice.getRegistrosUnicosFull(this.idJuego);
  }


}
