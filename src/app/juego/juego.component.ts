import { Component, OnInit } from '@angular/core';

import { JuegosService, rangos } from '../servicios/juegos.service';
import { partida, PartidasService } from '../servicios/partidas.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  idJuego:number;
  arrPartidas: partida[];
  arrRango: rangos[]

  constructor(private partidasservice: PartidasService, private juegosservice: JuegosService) {
    this.arrPartidas = [];
    this.arrRango = []
   }

  ngOnInit() {
    this.partidasservice.getPartidasFull()
    .then(partida => {
      this.arrPartidas = partida;
      
    })
    .catch(error => console.log(error)
    );
   
    
  }

}
