import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-partida',
  templateUrl: './formulario-partida.component.html',
  styleUrls: ['./formulario-partida.component.css']
})
export class FormularioPartidaComponent implements OnInit {

  formulario: FormGroup;

  constructor() {
    
    this.formulario = new FormGroup({
      usuario: new FormControl('',[Validators.required]),
      date: new FormControl ('',[Validators.required]),


    })

   }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formulario.value);
  }

}
