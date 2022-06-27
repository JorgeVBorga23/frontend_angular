import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResidenciasService {
  url = "/appresidencias/backend/residencias.php"
  constructor(private http: HttpClient, private router: Router) { }

  getResidencias(){
    return this.http.get(this.url)
  }
  borrarResidencias(id:any){
    return this.http.delete(this.url+"?id="+id)
  }
  agregarResidencia(obj: any){
    return this.http.post(this.url, obj)
  }
  actualizarResidencia(obj: any){
    return this.http.put(this.url, obj)
  }
  getResidencia(id:any){
    return this.http.get(this.url+"?id="+id)
  }
}
