import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component';
import { AuthService } from '../services/auth.Service';
import { Role } from '../models/role';
import { RegisterDto } from '../models/RegisterDto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, HttpClientModule, TermsConditionsComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  showModal = false;

  userTypes = [
    { value: Role.PASSAGER, label: 'Passager' },
    { value: Role.CONDUCTEUR, label: 'Conducteur' }
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
      userType: [Role.PASSAGER, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
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

      const registerDto: RegisterDto = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phoneNumber: formValues.phone,
        password: formValues.password,
        userType: formValues.userType
      };

      console.log('RegisterDto object:', registerDto);

      this.authService.register(registerDto).subscribe({
        next: () => {
          alert('Inscription réussie !');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert("Erreur lors de l'inscription.");
          console.error(err);
          this.isSubmitting = false;
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

  get f() {
    return this.registerForm.controls;
  }
}
