import { Component, OnInit } from '@angular/core';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md'
import swal from 'sweetalert2';
import { JuegosService } from '../servicios/juegos.service';
import { PartidasService } from '../servicios/partidas.service';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {


  arrJuegos: any[]

  constructor(private juegosservice: JuegosService, private partidasservice: PartidasService, private usuariosservice: UsuariosService) { }

  async ngOnInit() {
    this.usuariosservice.getUsuario()
    this.usuariosservice.isLogged()

    this.juegosservice.obtenerJuegos()

    this.arrJuegos = await this.juegosservice.obtenerJuegos()


    if (!this.usuariosservice.isLogged()) {
      setTimeout(() => {
        swal.fire({
          title: '¿Por qué no empiezas por registrarte?',
          text: 'Regístrate y empieza a jugar hoy mismo',
          imageUrl: 'https://media.giphy.com/media/XCmcHcwMnHHbwI1ea2/giphy-downsized.gif',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        }).then(function () {
          window.location.href = "/registro"
        })
      }, 3000);
    }
    /* setTimeout(() => {
      swal.fire({
        title: '¿A qué esperas para empezar??',
        text: 'Ver tus juegos favoritos',
        imageUrl: 'https://media.giphy.com/media/KHbfOPypfweSHuP0c1/giphy.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      }).then(function () {
        window.scrollTo(10, document.body.scrollHeight)
      })
    }, 3000); */
  }


  isLogged() {
    if (this.usuariosservice.isLogged())

      return true

    else {
      return false
    }



  }

  onClick() {

    window.scrollTo(0, document.body.scrollHeight)

  }
}
