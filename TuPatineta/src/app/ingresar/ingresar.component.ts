import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams  } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {
  
  @ViewChild('usuario') usuario: ElementRef;
  @ViewChild('contrasena') contrasena: ElementRef;
  
  constructor( private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    (document.getElementById("btnIngresar") as HTMLElement).addEventListener("click", () => this.ingresoClick());
  }

  ingresoClick(): void {
    var correo = this.usuario.nativeElement.value;
    var contrasena = this.contrasena.nativeElement.value;

    const params = new HttpParams()
      .set('correo', correo)
      .set('contrasena', contrasena);

    this.http.get<{ usuario_valido: boolean, usuario_id : string, usuario_rol : string  }>('http://localhost/TuPatinetaV2/API_Tupatineta/API_Tupatineta.php/usuario_validar', { params })
    .subscribe(
      response => {
        console.log('Usuario válido:', response.usuario_rol);
        if (response.usuario_valido) {
          Swal.fire({
            icon: 'success',
            title: 'Inicio de Sesión Exitoso',
            text: '¡Bienvenido!',
          })
          if(response.usuario_rol == 'administrador')
          {
            this.router.navigate(['/admin'], { state: { id_usuario: response.usuario_id } });
          }
          else{
            this.router.navigate(['/servicio'], { state: { id_usuario: response.usuario_id } });
          }
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario y/o contraseña incorrecta',
          });
          // Lógica si el usuario no es válido
        }
      },
      error => {
        console.error('Error al verificar el usuario', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al verificar el usuario. Por favor, inténtalo de nuevo.',
        });
      }
    );
  }

}
