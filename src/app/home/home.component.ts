import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { juego, JuegosService } from '../servicios/juegos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  arrJuego: juego[];

  constructor(private activatedRoute: ActivatedRoute, private juegosservice: JuegosService) {

    this.arrJuego = [];

  }



  ngOnInit() {

    this.juegosservice.obtenerJuegos()
      .then(juego => {
        this.arrJuego = juego;
      })
      .catch(error => console.log(error));
  }

}
