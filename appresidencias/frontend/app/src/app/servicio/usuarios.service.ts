import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = "/appresidencias/backend/usuarios.php"
  constructor(private http: HttpClient, private router: Router) {
  }
  insertarUsuarios(obj:any){
    return this.http.post(this.url, obj)
  }
  getUsuarios() {
    return this.http.get(this.url)
  }
  actualizarUsuario(obj:any){
    return this.http.put(this.url, obj)
  }
  borrarUsuario(id:any){
    return this.http.delete(this.url+"?numeroControl="+id)
  }
  getUsuario(num:any) {
    return this.http.get(this.url+"?numeroControl="+num)
  }
  logear(ncontrol: string | null, pass: string | null){

    let obj = {"numeroControl": ncontrol, "pass": pass}
    let json = JSON.stringify(obj)
    return this.http.post(this.url+"?login=", json)
  }
  verificarLogeado():Boolean{
    return !!localStorage.getItem("USER_KEY")
  }
  cerrarSesion(){
    localStorage.removeItem("USER_KEY")
    location.reload()
    this.router.navigate(["login"])
  }
  solicitarProyecto(num: any, id: any){
    let obj = {"numeroControl": num, "idResidencia": id}
    return this.http.post(this.url+"?solicitar", obj)
  }
  buscarProyecto(){
    let obj = {"numeroControl": localStorage.getItem("USER_KEY")}
    return this.http.post(this.url+"?buscarProyecto", obj)
  }
}
