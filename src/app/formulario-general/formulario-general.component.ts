import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulario-general',
  templateUrl: './formulario-general.component.html',
  styleUrls: ['./formulario-general.component.css']
})
export class FormularioGeneralComponent implements OnInit {

  formulario: FormGroup;
  tipoPassword: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
