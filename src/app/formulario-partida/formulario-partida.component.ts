import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JuegosService } from '../servicios/juegos.service';

@Component({
  selector: 'app-formulario-partida',
  templateUrl: './formulario-partida.component.html',
  styleUrls: ['./formulario-partida.component.css']
})
export class FormularioPartidaComponent implements OnInit {

  arrJuegos: any;
  formulario: FormGroup;

  constructor(private juegosService: JuegosService) {

    this.formulario = new FormGroup({
      usuario: new FormControl('',[Validators.required]),
      date: new FormControl ('',[Validators.required]),


    })

   }

  ngOnInit(): void {
    this.juegosService.obtenerJuegos()
      .then(juegos => {
        this.arrJuegos = juegos;
      })
      .catch(error => console.log(error));
      
  }

  onSubmit() {
    console.log(this.formulario.value);
  }

}
