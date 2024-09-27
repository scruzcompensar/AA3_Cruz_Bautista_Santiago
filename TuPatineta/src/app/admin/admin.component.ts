import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  id_usuario : string

  constructor(private http: HttpClient, private renderer: Renderer2,private router: Router ) 
  {
     const navigation = this.router.getCurrentNavigation();
     const state = navigation?.extras.state as { id_usuario: string };
     this.id_usuario = state?.id_usuario;
  }

  @ViewChild('tipoServicioSelect') tipoServicioSelect!: ElementRef;
  @ViewChild('fechaInicioInput') fechaInicioInput!: ElementRef;
  @ViewChild('fechaFinInput') fechaFinInput!: ElementRef;
  @ViewChild('duracionInput') duracionInput!: ElementRef;
  @ViewChild('tarifaInput') tarifaInput!: ElementRef;
  @ViewChild('estadoSelect') estadoSelect!: ElementRef;
  @ViewChild('id_servicio') id_servicio!: ElementRef;

  ngOnInit(): void {
    document.getElementById('fecha_fin')!.addEventListener('change', this.calculateDurationAndTarifa.bind(this));
    document.getElementById('id_tipo_servicio')!.addEventListener('change', this.calculateDurationAndTarifa.bind(this));

    document.getElementById('fecha_fin_editar')!.addEventListener('change', this.calculateDurationAndTarifaEditar.bind(this));
    document.getElementById('id_tipo_servicio_editar')!.addEventListener('change', this.calculateDurationAndTarifaEditar.bind(this));
    this.crearServicio();
  }

    calculateDurationAndTarifa(): void {
    const fechaInicio = new Date((document.getElementById('fecha_inicio') as HTMLInputElement).value);
    const fechaFin = new Date((document.getElementById('fecha_fin') as HTMLInputElement).value);
    const tipoServicio = (document.getElementById('id_tipo_servicio') as HTMLInputElement).value;

    if (fechaFin < fechaInicio) {
        (document.getElementById('error_message') as HTMLElement).style.display = 'block';
        (document.getElementById('duracion_servicio') as HTMLInputElement).value = '';
        (document.getElementById('tarifa') as HTMLInputElement).value = '';
        return;
    }

    (document.getElementById('error_message') as HTMLElement).style.display = 'none';

    const duracionMinutos = (fechaFin.getTime() - fechaInicio.getTime()) / 60000; // Convert milliseconds to minutes
    (document.getElementById('duracion_servicio') as HTMLInputElement).value = duracionMinutos.toString();

    let tarifaPorMinuto = 0;
    switch(tipoServicio) {
        case '1':
            tarifaPorMinuto = 13;
            break;
        case '2':
            tarifaPorMinuto = 30;
            break;
        case '3':
            (document.getElementById('tarifa') as HTMLInputElement).value = '9000'; // Fixed rate for "Asistencia en carretera"
            return;
        case '4':
            tarifaPorMinuto = 8;
            break;
        default:
            (document.getElementById('tarifa') as HTMLInputElement).value = '22 ';
            return;
    }

    const tarifaTotal = duracionMinutos * tarifaPorMinuto;
    (document.getElementById('tarifa') as HTMLInputElement).value = tarifaTotal.toString();
  }

  calculateDurationAndTarifaEditar(): void {
    const fechaInicio = new Date((document.getElementById('fecha_inicio_editar') as HTMLInputElement).value);
    const fechaFin = new Date((document.getElementById('fecha_fin_editar') as HTMLInputElement).value);
    const tipoServicio = (document.getElementById('id_tipo_servicio_editar') as HTMLInputElement).value;

    if (fechaFin < fechaInicio) {
        (document.getElementById('error_message_editar') as HTMLElement).style.display = 'block';
        (document.getElementById('duracion_servicio_editar') as HTMLInputElement).value = '';
        (document.getElementById('tarifa_editar') as HTMLInputElement).value = '';
        return;
    }

    (document.getElementById('error_message_editar') as HTMLElement).style.display = 'none';

    const duracionMinutos = (fechaFin.getTime() - fechaInicio.getTime()) / 60000; // Convert milliseconds to minutes
    (document.getElementById('duracion_servicio_editar') as HTMLInputElement).value = duracionMinutos.toString();

    let tarifaPorMinuto = 0;
    switch(tipoServicio) {
        case '1':
            tarifaPorMinuto = 13;
            break;
        case '2':
            tarifaPorMinuto = 30;
            break;
        case '3':
            (document.getElementById('tarifa_editar') as HTMLInputElement).value = '9000'; // Fixed rate for "Asistencia en carretera"
            return;
        case '4':
            tarifaPorMinuto = 8;
            break;
        default:
            (document.getElementById('tarifa_editar') as HTMLInputElement).value = '22 ';
            return;
    }

    const tarifaTotal = duracionMinutos * tarifaPorMinuto;
    (document.getElementById('tarifa_editar') as HTMLInputElement).value = tarifaTotal.toString();
  }
  
  registrar() {

    const id_tipo_servicio = (document.getElementById('id_tipo_servicio') as HTMLInputElement).value;
    const id_usuario = this.id_usuario;
    const fecha_inicio = (document.getElementById('fecha_inicio') as HTMLInputElement).value;
    const fecha_fin = (document.getElementById('fecha_fin') as HTMLInputElement).value;
    const tarifa_fin = (document.getElementById('tarifa') as HTMLInputElement).value;
    const estado = (document.getElementById('estado') as HTMLInputElement).value;

    const formData = {
      id_tipo_servicio,
      id_usuario,
      fecha_inicio,
      fecha_fin,
      tarifa_fin ,
      estado
    };
    

    this.http.post('http://localhost/TuPatinetaV2/API_Tupatineta/API_Tupatineta.php/servicio', formData).subscribe(
      response => {
        console.log('Registro exitoso', response);
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: '¡Tu registro ha sido exitoso!',
        });
        //this.closeModal();
        this.crearServicio();
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

  crearServicio(): void {
    this.http.get<any[]>(`http://localhost/TuPatinetaV2/API_Tupatineta/API_Tupatineta.php/servicios`)
    .subscribe(
      servicios => {
        console.log('Response from API:', servicios);
        
        const tbody = document.getElementById('grid')!;
        tbody.innerHTML = ''; // Limpiar el contenido anterior
        servicios.forEach(servicio => {
          const row = document.createElement('tr');
          
          row.innerHTML = `
            <td>${servicio.id_servicio}</td>
            <td>${servicio.nombre_servicio}</td>
            <td>${servicio.correo_usuario}</td>
            <td>${servicio.direccion_usuario}</td>
            <td>${servicio.fecha_inicio}</td>
            <td>${servicio.fecha_fin}</td>
            <td>${servicio.tarifa_fin}</td>
            <td>${servicio.estado}</td>
            <td>
              <button class="btn btn-danger" (click)="eliminar_id_servicio()">Eliminar</button>
              <button class="btn btn-warning" (click)="cargar_datos(${servicio.id_servicio})" data-toggle="modal" data-target="#editarModal">Editar</button>
            </td>
          `;

          tbody.appendChild(row);
          const eliminarButton = row.querySelector('.btn-danger');
          const actualizarButton = row.querySelector('.btn-warning');

          this.renderer.listen(eliminarButton, 'click', () => this.eliminar_id_servicio(servicio.id_servicio));
          this.renderer.listen(actualizarButton, 'click', () => this.cargar_datos(servicio.id_servicio));
        });
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

  
  eliminar_id_servicio(id_servicio: number): void {
    this.http.delete(`http://localhost/TuPatinetaV2/API_Tupatineta/API_Tupatineta.php/servicio?id_servicio=${id_servicio}`)
      .subscribe(
        response => {
          console.log('Registro exitoso', response);
          Swal.fire({
            icon: 'success',
            title: 'Se ha eliminado correctamente el servicio!',
            text: '¡Tu registro ha sido exitoso!',
          });
          this.crearServicio();
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

      
  cargar_datos(id_servicio: number): void {
    // Realizar la solicitud HTTP para obtener los datos del servicio con el ID proporcionado
    this.http.get<any>(`http://localhost/TuPatinetaV2/API_Tupatineta/API_Tupatineta.php/serviciosbyid?id=${id_servicio}`)
      .subscribe(
        servicio => {
          this.tipoServicioSelect.nativeElement.value = servicio.id_tipo_servicio;
          this.fechaInicioInput.nativeElement.value = servicio.fecha_inicio;
          this.fechaFinInput.nativeElement.value = servicio.fecha_fin;
          this.tarifaInput.nativeElement.value = servicio.tarifa_fin;
          this.estadoSelect.nativeElement.value = servicio.estado;
          this.id_servicio.nativeElement.value = servicio.id_servicio;

  
          // Mostrar el modal después de asignar los valores
          const modalElement = document.getElementById('actualizarModal') as HTMLElement;
          const modal = new (window as any).bootstrap.Modal(modalElement);
          modal.show();
  
        },
        error => {
          console.error('Error al cargar datos del servicio', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al cargar los datos del servicio. Por favor, inténtalo de nuevo.',
          });
        }
      );
  }
  
  actualizar() {
    const id_tipo_servicio = this.tipoServicioSelect.nativeElement.value;
    const id_usuario = this.id_usuario;
    const fecha_inicio = this.fechaInicioInput.nativeElement.value;
    const fecha_fin = this.fechaFinInput.nativeElement.value;
    const tarifa_fin = this.tarifaInput.nativeElement.value;
    const estado = this.estadoSelect.nativeElement.value;
    const id_servicio = this.id_servicio.nativeElement.value;

    const formData = {
      id_servicio,
      id_tipo_servicio,
      id_usuario,
      fecha_inicio,
      fecha_fin,
      tarifa_fin ,
      estado
    };

    this.http.put('http://localhost/TuPatinetaV2/API_Tupatineta/API_Tupatineta.php/servicio', formData).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Actualización Exitosa',
          text: '¡Tu registro ha sido exitoso!',
        });
        this.closeModal()
        this.crearServicio();
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
  

  closeModal(): void {
    const modalElement = document.getElementById('exampleModal') as HTMLElement;
    const modal = new (window as any).bootstrap.Modal(modalElement);
    modal.hide();
  }

}
