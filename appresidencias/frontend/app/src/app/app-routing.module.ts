import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProyectoComponent } from './add-proyecto/add-proyecto.component';
import { AppComponent } from './app.component';
import { AutenticacionGuard } from './autenticacion.guard';
import { EditarProyectoComponent } from './editar-proyecto/editar-proyecto.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {path: '', redirectTo: "home", pathMatch: "full"},
  {path: 'home', component: HomeComponent, canActivate:[AutenticacionGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegistroComponent},
  {path: "agregarProyecto",component: AddProyectoComponent},
  {path: "editarUsuario", component: EditarUsuarioComponent},
  {path: "editarProyecto", component: EditarProyectoComponent},
  {path: '**', redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
