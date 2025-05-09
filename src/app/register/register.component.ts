import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.Service';
import { HttpClientModule } from '@angular/common/http';
import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, HttpClientModule, TermsConditionsComponent],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  showModal = false;

  userTypes = [
    { value: 'PASSAGER', label: 'Passager' },
    { value: 'CONDUCTEUR', label: 'Conducteur' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      userType: ['PASSAGER', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formValues = this.registerForm.value;

      const userData = {
        nom: formValues.lastName,
        prenom: formValues.firstName,
        email: formValues.email,
        password: formValues.password,
        telephone: formValues.phone,
        userType: formValues.userType
      };

      this.authService.register(userData).subscribe({
        next: () => {
          alert('Inscription réussie !');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert("Erreur lors de l'inscription.");
          console.error(err);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  get f() { return this.registerForm.controls; }
}