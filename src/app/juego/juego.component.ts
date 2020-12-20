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

    const registros = await this.partidasservice.getRegistrosUnicos();
    console.log(registros);

    this.arrPartidasByJuego = registros

    console.log(this.arrPartidasByJuego);


    const juegos = await this.juegosservice.obtenerJuegos();

    this.arrJuegos = juegos

    this.activatedRoute.params.subscribe(async params => {

      this.idJuego = parseInt(params.idJuego);
      console.log('idJuego: ', this.idJuego);

    });
    /* 
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
    
        this.partidasservice.getPartidasPagina(this.idJuego, this.pagina)
          .then(partidas => {
    
            this.arrPartidasByJuego = partidas
    
    
            this.idModos = this.arrPartidasByJuego.map(m => m.id_modo)
    
          })
          .catch(error => console.log(error)
          );
    
        //ORDENADAS POR FECHA
     */

  }

  //TODO ARREGLAR LA QUERY RE REGISTROS Y HACER QUE NO SE REPITAN

  async onChange($event) {

    const registros = await this.partidasservice.getRegistrosUnicos()

      /* registros.forEach(registro => {
  
        if (registro.fk_modo_juego === $event.target.value) {
          this.arrRangosByJuego += registro
  
        }
        console.log(registro)
      }
      ) */
      ;




    /*    const partidas = await this.partidasservice.getPartidasByIdModo($event.target.value, this.pagina)
       console.log(partidas);
   
       this.arrPartidasByJuego = partidas
   
       console.log(this.arrPartidasByJuego);
    */

  }

  async onChangeRangos($event) {
    const partidas = await this.partidasservice.getPartidasByIdRango($event.target.value, this.pagina)

    this.arrPartidasByJuego = partidas
  }

  async onChangeFechas($event) {

    if ($event.target.value === "A") {
      const partidasAntiguas = await this.partidasservice.getPartidasByAntiguas(this.idJuego, this.pagina)
      this.arrPartidasByJuego = partidasAntiguas
      console.log(partidasAntiguas);

    }
    else {
      const partidasRecientes = await this.partidasservice.getPartidasByRecientes(this.idJuego, this.pagina)
      this.arrPartidasByJuego = partidasRecientes
    }
  }

  async onClick(siguiente) {
    if (siguiente) { this.pagina++ }
    else { this.pagina-- }

    const partidasPagina = await this.partidasservice.getPartidasPagina(this.idJuego, this.pagina)
    this.arrPartidasByJuego = partidasPagina



    window.scrollTo({ top: 50, behavior: 'smooth' });



    console.log(partidasPagina);

  }


}
