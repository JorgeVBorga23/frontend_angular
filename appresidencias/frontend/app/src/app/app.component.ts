import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from './servicio/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuariosService]
})
export class AppComponent {
  logeado = localStorage.getItem("USER_KEY")

  constructor(public usuarioService: UsuariosService, private router: Router) {
  }
}


