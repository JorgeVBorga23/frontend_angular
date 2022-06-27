import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutenticacionGuard } from './autenticacion.guard';
import { UsuariosService } from './servicio/usuarios.service';
import { AddProyectoComponent } from './add-proyecto/add-proyecto.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { EditarProyectoComponent } from './editar-proyecto/editar-proyecto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    AddProyectoComponent,
    EditarUsuarioComponent,
    EditarProyectoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AutenticacionGuard, UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
