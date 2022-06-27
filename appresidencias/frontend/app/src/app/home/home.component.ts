import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResidenciasService } from '../servicio/residencias.service';
import { UsuariosService } from '../servicio/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  residencias: any = []
  usuario: any = []
  cumpleRequisitos: any
  tieneProyecto = false
  nombreProyecto = ""

  constructor(private router: Router, private ressvc: ResidenciasService, private usrscv: UsuariosService) {
  }

  ngOnInit(): void {

    this.ressvc.getResidencias().subscribe(res => {
      this.residencias = res
    })
    this.usrscv.getUsuario(localStorage.getItem("USER_KEY")).subscribe(res => {
      this.usuario = res
      if (this.usuario.creditoscomple == 1 &&
        this.usuario.serviciosocial == 1 &&
        this.usuario.porcentcreditos == 1
      ) {
        this.cumpleRequisitos = true
      } else {
        this.cumpleRequisitos = false
      }

      if (this.cumpleRequisitos) {
        if (this.usuario.idResidencia == null) {
          this.tieneProyecto = false
        } else {
          this.tieneProyecto =  true
        }
      }else{
        this.tieneProyecto = false
      }

      console.log(res)
    })
    this.usrscv.buscarProyecto().subscribe(res=>{
      let obj: any = res
      console.log(obj.nombreResidencia)
      this.nombreProyecto = obj.nombreResidencia
    })
  }

  cerrarSesion() {
    localStorage.removeItem("USER_KEY")
    alert("Sesion cerrada")
    this.router.navigate(['login'])
  }
  borrar(id: any) {
    if (confirm("Seguro que deseas eliminar este proyecto?")) {
      this.ressvc.borrarResidencias(id).subscribe(res=>{
        alert(res)
        location.reload()
      })
    }
  }
  editar(id:any){
    localStorage.setItem("ID_PROYECTO", id)
    this.router.navigate(["editarProyecto"])
  }
  solicitar(id:any){
    if (confirm("Seguro que quieres solicitar este proyecto?")) {
      this.usrscv.solicitarProyecto(localStorage.getItem("USER_KEY"), id).subscribe(res=>{
          alert("Proyecto solicitado correctamente!")
          location.reload()
      })
    }
  }
}
