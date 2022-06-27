import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../servicio/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  usr:any ={}
  formgroup = new FormGroup({

    numeroControl: new FormControl(""),
    password: new FormControl(""),
    nombreC: new FormControl("")
  })
  constructor(private usrsvc: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.usrsvc.getUsuario(localStorage.getItem("USER_KEY")).subscribe(res=>{
      this.usr =res
      this.formgroup.controls.numeroControl.setValue(this.usr.numeroControl)
      this.formgroup.controls.password.setValue(this.usr.password)
      this.formgroup.controls.nombreC.setValue(this.usr.nombreC)


    })
  }
  actualizarUsuario(){
    let obj = {
        "numeroControl": this.formgroup.controls.numeroControl.value,
        "pass":this.formgroup.controls.password.value,
        "nombre":this.formgroup.controls.nombreC.value,
        "creditosC":this.usr.creditoscomple,
        "creditos":this.usr.porcentcreditos,
        "servicio":this.usr.serviciosocial
    }
    console.log(obj)
    this.usrsvc.actualizarUsuario(obj).subscribe(res=>{
      alert("usuario actualizado correctamente!")
      this.router.navigate(["home"])
    })

  }

}
