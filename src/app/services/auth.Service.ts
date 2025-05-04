import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  login(email: string, password: string): void {
    // Ici, vous implémenteriez la logique de connexion réelle
    // Pour l'exemple, nous simulons une connexion réussie
    this.isLoggedInSubject.next(true);
    this.router.navigate(['/']);
  }

  register(userData: any): void {
    // Logique d'inscription
    this.isLoggedInSubject.next(true);
    this.router.navigate(['/']);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  checkAuthStatus(): void {
    // Vérifier le statut d'authentification (par exemple avec un token)
    const isLoggedIn = /* votre logique de vérification */ false;
    this.isLoggedInSubject.next(isLoggedIn);
  }
}