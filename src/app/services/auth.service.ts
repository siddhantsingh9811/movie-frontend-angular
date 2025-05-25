import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/api/auth`;
  isLoggedIn = signal(false);
  token = signal<string | null>(null)

  constructor(private http: HttpClient, private router: Router) { 
    let token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn.set(true);
      this.token.set(token);
    }
  }
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response.token) {
            this.isLoggedIn.set(true);
            this.token.set(response.token);
            localStorage.setItem('token', response.token);
            console.log('Login successful', response);
          }
        })
      );
  }

    signup(email: string, password: string, age:Number) {
    return this.http.post<{ token: string }>(`${this.authUrl}/signup`, { email, password, age })
      .pipe(
        tap(response => {
          if (response.token) {
            this.isLoggedIn.set(true);
            this.token.set(response.token);
            localStorage.setItem('token', response.token);
            console.log('Signup successful', response);
          }
        })
      );
  }

  logout() {
    // Clear local storage
    localStorage.removeItem('token');
    // Reset signals
    this.token.set(null);
    this.isLoggedIn.set(false);
    // Navigate to login page (optional)
    this.router.navigate(['/login']);
    console.log('Logged out successfully');
  }
  isAuthenticated() {
    return this.isLoggedIn();
  }
  getToken() {
    return this.token();
  }
}

  
