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

  idJuego:number;
  arrPartidas: partida[];
  arrRango: rangos[]
  partidaSeleccionada: any

  constructor(private partidasservice: PartidasService, private juegosservice: JuegosService, private activatedRoute: ActivatedRoute)  {
    this.arrPartidas = [];
    this.arrRango = []
    
   }

  ngOnInit() {
/* 
    this.activatedRoute.params.subscribe(async params=>{
      console.log(params);
      this.partidaSeleccionada = await this.partidasservice.getPartidaFullByRegistro(params.registro_partida)
    }); */
    


    this.partidasservice.getPartidasFull()
    .then(partida => {
      this.arrPartidas = partida;
      console.log(this.arrPartidas);
      
    })
    .catch(error => console.log(error)
    );
    console.log(this.arrPartidas);
    
    

   
    
  }

}
