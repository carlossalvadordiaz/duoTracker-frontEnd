import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-general',
  templateUrl: './formulario-general.component.html',
  styleUrls: ['./formulario-general.component.css']
})
export class FormularioGeneralComponent implements OnInit {

  formulario: FormGroup;
  tipoPassword: string;

  constructor() { 
    this.tipoPassword = 'password';
    this.formulario = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      username: new FormControl('',[
        Validators.required,
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/)
      ]),
      repite_password : new  FormControl()
      
    }, [this.passwordValidator]);
  }

  ngOnInit(): void {
  }


  onSubmit() {

  }

  onClick($event) {
    
  }

  passwordValidator(){

  }
}
