import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Define the LoginResponse interface
interface LoginResponse {
  token: string;
  // Add other properties if needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = 'http://localhost:8085/auth';

 constructor(private http: HttpClient) {}

 // Appelle /auth/signup
 register(user: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/signup`, user, {
    responseType: 'text' as 'json'
  });
 }
  
  
  // Connexion
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/signin`, {
      email,
      password
    });
  }

  // Utilitaire pour stocker et récupérer le token
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}


