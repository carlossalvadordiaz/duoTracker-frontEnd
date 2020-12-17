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
  arrJuegos: any[]
  arrPartidasByJuego: any[]
  arrModosByJuego: any[]
  arrPartidasByModo: any[]
  idModos: any[];

  constructor(private partidasservice: PartidasService, private juegosservice: JuegosService, private activatedRoute: ActivatedRoute)  {
    this.arrPartidas = [];
    this.arrRango = []
    this.arrJuegos = []
    this.arrPartidasByJuego = []
    this.arrModosByJuego = []
    this.arrPartidasByModo = []
    
   }

  async ngOnInit() {


    this.activatedRoute.params.subscribe(async params=>{
/*       console.log(params); */
        this.idJuego = parseInt(params.idJuego);
    }); 

    this.juegosservice.obtenerModos(this.idJuego)
    .then(modo => {
      this.arrModosByJuego = modo;
/*       console.log(this.arrModosByJuego); */
    })
    .catch(error => console.log(error)
    );
    
    

    const juegos = await this.juegosservice.obtenerJuegos()
    this.arrJuegos = juegos;
    
    
 
    
    


    this.partidasservice.getPartidasFull()
    .then(partida => {
      this.arrPartidas = partida;
/*       console.log(this.arrPartidas);
      console.log(this.idJuego); */
      
      
      this.arrPartidasByJuego = this.arrPartidas.filter(p => p.id_juego === this.idJuego)
      this.idModos = this.arrPartidasByJuego.map(m => m.id_modo)
  /*   console.log(this.idModos); */
     
/*       console.log(this.arrPartidasByJuego); */
      
      
    })

    .catch(error => console.log(error)
    );
    
    /* console.log(this.idModos); */
    
    
    
  }
    

  async onChange($event){
/*     this.arrPartidasByJuego.forEach(partida =>{
      partida.id_modo = $event.target.value;
    }) */
    
/*     console.log(this.arrPartidasByJuego);
    
    
    console.log($event.target.value);
     */
    
    const partidas = await this.partidasservice.getPartidasByIdModo($event.target.value)
    console.log(partidas); 
    
    
    /* console.log($event.target.value); */
    
    
   /*  this.arrPartidasByJuego = partidas */
   /*      console.log(this.idModos); */
    /* console.log(this.arrPartidasByJuego); */
      
      
      
     
  }
}
