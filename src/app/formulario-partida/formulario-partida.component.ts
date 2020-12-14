import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { juego, JuegosService, modos, rangos } from '../servicios/juegos.service';
import { PartidasService } from '../servicios/partidas.service';
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
  idUsuario: number;
  formValues: any[];

  constructor(private juegosService: JuegosService , private activatedRoute: ActivatedRoute , private usuariosservice: UsuariosService, private partidasservice: PartidasService) {
    this.arrJuegos = []
    this.arrModos = []
    this.arrRangos = []
    this.formValues = []

    





    this.formulario = new FormGroup({
     /*  usuario: new FormControl('',[Validators.required]), */
      fecha: new FormControl ('',[Validators.required]),
      descripcion: new FormControl(),
      fk_modo_juego: new FormControl(''),
      fk_rango: new FormControl(''),
      fk_juego: new FormControl(''),
      fk_usuario: new FormControl('')
    })
    
   }

  async ngOnInit() {

    this.datosUsuario = await this.usuariosservice.getUsuario()
    this.idUsuario = this.datosUsuario.id;
   

    this.juegosService.obtenerJuegos()
      .then(juego => {
        this.arrJuegos = juego;
      })
      .catch(error => console.log(error));

    this.activatedRoute.params.subscribe(params => {
      this.idJuego = params.idJuego;
      /*      console.log(this.idJuego); */

      this.juegosService.obtenerModos(params.idJuego)
        .then(modo => {
          this.arrModos = modo;
        })
        .catch(error => console.log(error)
        );

      this.activatedRoute.params.subscribe(params => {
        this.juegosService.obtenerRangos(params.idJuego)
          .then(rango => {
            this.arrRangos = rango;
          })
          .catch(error => console.log(error)
          );
      })

    })
    

  }

  async onSubmit() {
    /* console.log(this.formulario.value); */
/*     this.partidasservice.guardarPartida(this.formulario.value)
       .then(partida => {
        partida = this.formulario.value;
        console.log(partida);
      })  */
      const nuevaPartida = await this.partidasservice.guardarPartida(this.formulario.value)
      console.log(nuevaPartida);
      
      
      
  }

}
