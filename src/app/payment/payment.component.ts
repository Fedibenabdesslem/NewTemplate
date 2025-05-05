import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('cardFlip', [
      state('front', style({
        transform: 'rotateY(0deg)'
      })),
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      transition('front => back', [
        animate('0.5s ease-in', keyframes([
          style({ transform: 'rotateY(0deg)', offset: 0 }),
          style({ transform: 'rotateY(90deg)', offset: 0.5 }),
          style({ transform: 'rotateY(180deg)', offset: 1 })
        ]))
      ]),
      transition('back => front', [
        animate('0.5s ease-out', keyframes([
          style({ transform: 'rotateY(180deg)', offset: 0 }),
          style({ transform: 'rotateY(90deg)', offset: 0.5 }),
          style({ transform: 'rotateY(0deg)', offset: 1 })
        ]))
      ])
    ]),
    trigger('progressBar', [
      state('start', style({
        width: '0%'
      })),
      state('complete', style({
        width: '100%'
      })),
      transition('start => complete', [
        animate('1.5s ease-in-out')
      ])
    ])
  ]
})
export class PaymentComponent {
  paymentForm: FormGroup;
  cardSide: 'front' | 'back' = 'front';
  paymentStatus: 'processing' | 'success' | 'failed' | null = null;
  showCvvHint = false;
  activePaymentMethod: 'card' | 'wallet' | 'bank' = 'card';
  progressState = 'start';

  paymentMethods: { id: 'card' | 'wallet' | 'bank'; name: string; icon: string; color: string }[] = [
    { id: 'card', name: 'Carte Bancaire', icon: 'fa-credit-card', color: '#4CAF50' },
    { id: 'wallet', name: 'Portefeuille', icon: 'fa-wallet', color: '#FFC107' },
    { id: 'bank', name: 'Virement Bancaire', icon: 'fa-university', color: '#2196F3' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      cardName: ['', [Validators.required]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      saveCard: [false]
    });
  }

  toggleCardSide() {
    this.cardSide = this.cardSide === 'front' ? 'back' : 'front';
  }

  showCvvHelp() {
    this.showCvvHint = true;
    setTimeout(() => this.showCvvHint = false, 3000);
  }

  selectPaymentMethod(method: 'card' | 'wallet' | 'bank') {
    this.activePaymentMethod = method;
  }

  processPayment() {
    if (this.paymentForm.invalid) return;

    this.paymentStatus = 'processing';
    this.progressState = 'complete';

    // Simulation de traitement
    setTimeout(() => {
      this.paymentStatus = 'success';
      setTimeout(() => this.router.navigate(['/confirmation']), 1500);
    }, 2000);
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s+/g, '');
    if (value.length > 0) {
      value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    this.paymentForm.patchValue({ cardNumber: value });
  }
}