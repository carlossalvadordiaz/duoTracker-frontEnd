import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { juego, JuegosService, modos, rangos } from '../servicios/juegos.service';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-formulario-partida',
  templateUrl: './formulario-partida.component.html',
  styleUrls: ['./formulario-partida.component.css']
})
export class FormularioPartidaComponent implements OnInit {

  arrJuegos: juego[];
  formulario: FormGroup;
  arrModos: modos[];
  arrRangos: rangos[];
  idJuego: number;
  datosUsuario: any;

  constructor(private juegosService: JuegosService , private activatedRoute: ActivatedRoute , private usuarioService: UsuariosService) {
    this.arrJuegos = []
    this.arrModos = []
    this.arrRangos = []

    /* this.datosUsuario = this.usuarioService.getUsuario()
    console.log(this.datosUsuario); */

    this.formulario = new FormGroup({
      usuario: new FormControl('',[Validators.required]),
      date: new FormControl ('',[Validators.required]),
      descripcion: new FormControl(),
      modos: new FormControl(''),
      rangos: new FormControl(''),
      fk_juego: new FormControl('')

    



    })

   }

 async ngOnInit() {
    this.juegosService.obtenerJuegos()
      .then(juego => {
        this.arrJuegos = juego;
      })
      .catch(error => console.log(error));

    this.activatedRoute.params.subscribe(params => {
      this.idJuego = params.idJuego;
 /*      console.log(this.idJuego); */
      
      this.juegosService.obtenerModos(params.idJuego)
      .then(modo =>{
        this.arrModos = modo;       
      })
      .catch(error => console.log(error)
      );
    
    this.activatedRoute.params.subscribe(params =>{
      this.juegosService.obtenerRangos(params.idJuego)
      .then(rango =>{
        this.arrRangos = rango;
      })
      .catch(error => console.log(error)
      );
    })

      
    })

    this.datosUsuario = await this.usuarioService.getUsuario();
    console.log(this.datosUsuario);
    
    
  }

  onSubmit() {
    console.log(this.formulario.value);
  }

}
