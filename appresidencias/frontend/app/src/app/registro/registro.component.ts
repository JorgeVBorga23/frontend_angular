import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UsuariosService } from '../servicio/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formgroup = new FormGroup({

    numeroControl: new FormControl(""),
    password: new FormControl(""),
    nombreC: new FormControl(""),
    creditoscomple: new FormControl(false),
    servicio: new FormControl(false),
    porcentcreditos: new FormControl(false)
  })
  constructor(private usrsvc: UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }

  registrarUsuario(){

    let obj = {

        "numeroControl": this.formgroup.controls.numeroControl.value,
        "pass":this.formgroup.controls.password.value,
        "nombre":this.formgroup.controls.nombreC.value,
        "creditosC":this.formgroup.controls.creditoscomple.value,
        "creditos":this.formgroup.controls.porcentcreditos.value,
        "servicio":this.formgroup.controls.servicio.value
    }

    console.log(obj)
    this.usrsvc.insertarUsuarios(obj).subscribe(res=>{
      alert("registrado correctamente!")
      this.router.navigate(["login"])
    })

  }
}
