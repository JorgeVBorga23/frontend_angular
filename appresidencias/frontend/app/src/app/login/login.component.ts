import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { UsuariosService } from '../servicio/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formgroup = new FormGroup({
    numeroControl: new FormControl(""),
    password: new FormControl(""),
  })


  constructor(private usrsvc: UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.usrsvc.logear(this.formgroup.controls.numeroControl.value,
      this.formgroup.controls.password.value).subscribe(res => {
        if (res != "") {
          localStorage.setItem("USER_KEY", res.toString())
          this.router.navigate(['home'])
        } else {
          alert("Usuario no encontrado en la base de datos")
        }
      })
  }


}
