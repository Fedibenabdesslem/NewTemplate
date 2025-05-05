import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.Service'; // Importez le AuthService
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, RouterLink,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage: string | null = null; // Pour afficher les erreurs de connexion

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService // Injectez le AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = null; // Réinitialisez le message d'erreur
      
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password)
        .pipe(
          catchError((error) => {
            // Gestion des erreurs
            this.errorMessage = error.error?.message || 'Une erreur est survenue lors de la connexion';
            return of(null); // Retourne un Observable null pour continuer le flux
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((response) => {
          if (response) {
            // Si la connexion réussit
            this.authService.saveToken(response.token); // Sauvegarde le token
            this.router.navigate(['/dashboard']); // Redirige vers le dashboard
          }
        });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}