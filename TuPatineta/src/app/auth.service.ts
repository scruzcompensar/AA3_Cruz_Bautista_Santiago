import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    this.http.post<{ usuario_valido: boolean, role: string }>('/api/usuario_validar', { correo: email, contrasena: password })
      .subscribe(response => {
        if (response.usuario_valido) {
          this.role = response.role;
          this.router.navigate(['/']);
        } else {
          alert('Credenciales incorrectas');
        }
      });
  }

  getRole() {
    return this.role;
  }

  logout() {
    this.role = null;
    this.router.navigate(['/login']);
  }
}
