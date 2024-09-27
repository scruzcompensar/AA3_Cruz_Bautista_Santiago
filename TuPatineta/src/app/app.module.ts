import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { IngresarComponent } from './ingresar/ingresar.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { ServicioComponent } from './servicio/servicio.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NosotrosComponent,
    ContactenosComponent,
    IngresarComponent,
    RegistrarseComponent,
    ServicioComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
