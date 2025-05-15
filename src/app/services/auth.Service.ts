import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode'; 
import { RegisterDto } from '../models/RegisterDto';

interface User {
  token: string;
  role: 'admin' | 'passager' | 'conducteur';
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8085/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.initializeUser();
  }

  private initializeUser(): void {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      if (decoded) {
        this.currentUserSubject.next({
          token,
          role: this.normalizeRole(decoded.role || decoded.userType),
          email: decoded.sub || decoded.email
        });
      }
    }
  }
   register(registerDto: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, registerDto);
  }

 


  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, { email, password }).pipe(
      tap(response => {
        const token = response.token || response;
        localStorage.setItem('token',token);
        const decoded = this.decodeToken(token);
  
        const userData: User = {
          token,
          role: this.normalizeRole(decoded.role || decoded.userType),
          email: decoded.sub || email
        };
  
        this.saveToken(token);
        this.currentUserSubject.next(userData);
        console.log('Decoded user:', userData);
        localStorage.setItem('userId', decoded.userId);
        

        this.redirectBasedOnRole(userData.role);
      })
    );
  }
  

  private normalizeRole(role: string): 'admin' | 'passager' | 'conducteur' {
    if (!role) return 'passager'; // Valeur par défaut
    
    const roleLower = role.toLowerCase();
    if (roleLower.includes('admin')) return 'admin';
    if (roleLower.includes('conducteur') || roleLower.includes('driver')) return 'conducteur';
    return 'passager'; // Fallback
  }

  private redirectBasedOnRole(role: string): void {
    console.log('Redirecting based on role:', role); // Debugging line
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'conducteur':
        this.router.navigate(['/conducteur']);
        break;
      case 'passager':
        console.log('Redirecting to passenger dashboard'); // Debugging line
        this.router.navigate(['/passager']);
        break;
      default:
        this.router.navigate(['/home']);
        break;
    }
  }
  
  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }

  // Les méthodes suivantes restent identiques
  saveToken(token: string): void { localStorage.setItem('authToken', token); }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  getRole(): string | null {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.role : null;
  }
  logout(): void { /* ... */ }
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  hasRole(requiredRole: string): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.role === requiredRole : false;
  }
}