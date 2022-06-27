import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuariosService } from './servicio/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

  constructor(private usrsvc: UsuariosService, private router: Router) { }
  canActivate(): boolean {
    if (this.usrsvc.verificarLogeado()) {
      return true
    }
    this.router.navigate(["login"])
    return false

  }

}
