import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { IngresarComponent } from './ingresar/ingresar.component';
import { RegistrarseComponent } from './registrarse/registrarse.component'; 
import { ServicioComponent} from './servicio/servicio.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'contactenos', component: ContactenosComponent},
  {path: 'ingresar', component: IngresarComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'servicio', component: ServicioComponent},
  {path: 'admin' , component: AdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
