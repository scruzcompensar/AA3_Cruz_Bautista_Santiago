import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  resetErrorMessages() {
    document.getElementById('nombre-error').style.display = 'none';
    document.getElementById('apellidos-error').style.display = 'none';
    document.getElementById('email-error').style.display = 'none';
  }

  validarEdad(fechaNacimiento: string): boolean {
    const fechaActual = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    var edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
    const mesActual = fechaActual.getMonth();
    const mesNacimiento = fechaNacimientoDate.getMonth();
    
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNacimientoDate.getDate())) {
      edad--;
    }
    
    return edad >= 18;
  }
  

  registrar() {
    this.resetErrorMessages();

    var form = (document.getElementById('registro') as HTMLInputElement);
    const nombreInput = form.querySelector('#nombre') as HTMLInputElement;
    const apellidosInput = form.querySelector('#apellidos') as HTMLInputElement;
    const emailInput = form.querySelector('#email') as HTMLInputElement;
    const contrasenaInput = form.querySelector('#contraseña') as HTMLInputElement;

    var fecha_nacimiento = (document.getElementById('fecha_nacimiento') as HTMLInputElement);

    if (form.checkValidity()) 
    {
      const edadValida = this.validarEdad(fecha_nacimiento.value);
      if (!edadValida) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el Registro',
          text: 'Debes esperar un poco más... La edad mínima para registrarte es de 18 años ',
        });
      }
      else{
        const nombre_usuario = (document.getElementById('nombre') as HTMLInputElement).value;
        const apellidos_usuario = (document.getElementById('apellidos') as HTMLInputElement).value;
        const identificacion_usuario = (document.getElementById('identificacion') as HTMLInputElement).value;
        const telefono_usuario = (document.getElementById('direccion') as HTMLInputElement).value;
        const direccion_usuario = (document.getElementById('telefono') as HTMLInputElement).value;
        const correo_usuario = (document.getElementById('email') as HTMLInputElement).value;
        const contraseña_usuario = (document.getElementById('contraseña') as HTMLInputElement).value;

        const formData = {
          nombre_usuario,
          apellidos_usuario,
          identificacion_usuario,
          telefono_usuario,
          direccion_usuario ,
          correo_usuario,
          contraseña_usuario
        };
        console.log(formData);

        this.http.post('http://localhost/TuPatinetaV2/API_Tupatineta/API_Tupatineta.php/usuario', formData).subscribe(
          response => {
            console.log('Registro exitoso', response);
            Swal.fire({
              icon: 'success',
              title: 'Registro Exitoso',
              text: '¡Tu registro ha sido exitoso!',
            });
            this.limpiarCampos()
          },
          error => {
            console.error('Error en el registro', error);
            Swal.fire({
              icon: 'error',
              title: 'Error en el Registro',
              text: 'Hubo un problema con tu registro. Por favor, inténtalo de nuevo.',
            });
          }
        );
      }

        
    } else {
      if (!nombreInput.checkValidity()) {
        document.getElementById('nombre-error').style.display = 'block';
      }
      else if (!apellidosInput.checkValidity()) {
        document.getElementById('apellidos-error').style.display = 'block';
      }
      else if (!emailInput.checkValidity()) {
        document.getElementById('email-error').style.display = 'block';
      }
      else if (!contrasenaInput.checkValidity()) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el Registro',
          text: 'Ingrese una contraseña con mínimo 4 caracteres, con una letra mayúscula, un número y un caracter especial',
        });
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Error en el Registro',
          text: 'Todos los campos son obligatorios.',
        });
      }
    }
  }

  limpiarCampos() {
    (document.getElementById('nombre') as HTMLInputElement).value = '';
    (document.getElementById('apellidos') as HTMLInputElement).value = '';
    (document.getElementById('identificacion') as HTMLInputElement).value = '';
    (document.getElementById('direccion') as HTMLInputElement).value = '';
    (document.getElementById('telefono') as HTMLInputElement).value = '';
    (document.getElementById('email') as HTMLInputElement).value = '';
    (document.getElementById('contraseña') as HTMLInputElement).value = '';
    (document.getElementById('fecha_nacimiento') as HTMLInputElement).value = '';
  }

}

