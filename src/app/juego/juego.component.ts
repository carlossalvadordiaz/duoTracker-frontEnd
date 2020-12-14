import { Component, OnInit } from '@angular/core';
import { partida, PartidasService } from '../servicios/partidas.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  idJuego:number;
  arrPartidas: partida[];

  constructor(private partidasservice: PartidasService) {
    this.arrPartidas = [];
   }

  ngOnInit() {
    this.partidasservice.getPartidas()
    .then(partida => {
      this.arrPartidas = partida;
      console.log(this.arrPartidas);
    })
    .catch(error => console.log(error)
    );
   
    
  }

}
