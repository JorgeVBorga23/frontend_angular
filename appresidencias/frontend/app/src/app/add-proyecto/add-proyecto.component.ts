import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResidenciasService } from '../servicio/residencias.service';

@Component({
  selector: 'app-add-proyecto',
  templateUrl: './add-proyecto.component.html',
  styleUrls: ['./add-proyecto.component.css']
})
export class AddProyectoComponent implements OnInit {
  formgroup = new FormGroup({
    nombreProyecto: new FormControl(""),
    duracionProyecto: new FormControl(""),
    lugarProyecto: new FormControl(""),
    descripcionProyecto: new FormControl("")
  })
  constructor(private ressvc: ResidenciasService, private router: Router) { }

  ngOnInit(): void {
  }
  nuevoProyecto(){
    let obj = {
      "nombre": this.formgroup.controls.nombreProyecto.value,
      "duracion": this.formgroup.controls.duracionProyecto.value,
      "lugar": this.formgroup.controls.lugarProyecto.value,
      "descripcion": this.formgroup.controls.descripcionProyecto.value
    }
    this.ressvc.agregarResidencia(obj).subscribe(res=>{
      alert("Proyecto agregado!")
      this.router.navigate(["home"])
      
    })

  }

}
