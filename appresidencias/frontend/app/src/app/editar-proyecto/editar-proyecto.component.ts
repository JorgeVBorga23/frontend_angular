import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResidenciasService } from '../servicio/residencias.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {
  residencia:any = []
  formgroup = new FormGroup({
    nombreProyecto: new FormControl(""),
    duracionProyecto: new FormControl(""),
    lugarProyecto: new FormControl(""),
    descripcionProyecto: new FormControl("")
  })
  constructor(private ressvc: ResidenciasService, private router: Router) { }

  ngOnInit(): void {
    this.ressvc.getResidencia(localStorage.getItem("ID_PROYECTO")).subscribe(res=>{

      this.residencia =res

      this.formgroup.controls.nombreProyecto.setValue(this.residencia.nombreResidencia)
      this.formgroup.controls.duracionProyecto.setValue(this.residencia.duracionResidencia)
      this.formgroup.controls.lugarProyecto.setValue(this.residencia.lugarResidencia)
      this.formgroup.controls.descripcionProyecto.setValue(this.residencia.descripcionResidencia)
    })

  }


  editarProyecto(){
    let obj = {
      "id": localStorage.getItem("ID_PROYECTO"),
      "nombre": this.formgroup.controls.nombreProyecto.value,
      "duracion": this.formgroup.controls.duracionProyecto.value,
      "lugar": this.formgroup.controls.lugarProyecto.value,
      "descripcion": this.formgroup.controls.descripcionProyecto.value
    }
    this.ressvc.actualizarResidencia(obj).subscribe(res=>{
      localStorage.removeItem("ID_PROYECTO")
      alert("Proyecto actualizado correctamente!")
      this.router.navigate(["home"])
    })
  }
}
