import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  paymentMethods = [
    { id: 'credit', name: 'Carte de crédit', icon: 'fa-credit-card' },
    { id: 'wallet', name: 'Porte-monnaie électronique', icon: 'fa-wallet' },
    { id: 'bank', name: 'Virement bancaire', icon: 'fa-university' }
  ];
  selectedMethod = 'credit';
  progress = 1;
  tripDetails = {
    from: 'Tunis',
    to: 'Sousse',
    date: '15/12/2023',
    time: '08:00',
    seats: 2,
    price: 30,
    driver: 'Mohamed S.',
    car: 'Peugeot 208'
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      cardName: ['', [Validators.required]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]],
      rememberCard: [false]
    });
  }

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  selectPayment(method: string) {
    this.selectedMethod = method;
    this.progress = 2;
  }

  confirmPayment() {
    if (this.paymentForm.valid) {
      this.progress = 3;
      // Simulation de traitement
      setTimeout(() => {
        this.router.navigate(['/confirmation']);
      }, 2000);
    }
  }

  get f() { return this.paymentForm.controls; }
}