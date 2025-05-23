import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { TrajetService } from '../services/trajet.service';

@Component({
  selector: 'app-proposer-trajet',
  templateUrl: './proposer-tarjet.component.html',
  styleUrls: ['./proposer-tarjet.component.css'],

  imports: [ReactiveFormsModule,RouterLink],
})
export class ProposerTrajetComponent {
  trajetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private trajetService: TrajetService,
    private router: Router
  ) {
    this.trajetForm = this.fb.group({
  userId: [1, Validators.required], // Remplacer dynamiquement si besoin
  startLocation: ['', Validators.required],
  endLocation: ['', Validators.required],
  departureTime: ['', [Validators.required, this.dateNotInPastValidator]],
  availableSeats: [1, [Validators.required, Validators.min(1)]],
  allowsLuggage: [false],
  allowsMusic: [false],
  price: [0, [Validators.required, Validators.min(0)]]
});
  }

  dateNotInPastValidator(control: import('@angular/forms').AbstractControl) {
    const inputDate = new Date(control.value);
    const now = new Date();
    if (control.value && inputDate < now) {
      return { dateInPast: true };
    }
    return null;
  }


  onSubmit() {
    if (this.trajetForm.valid) {
      this.trajetService.proposerTrajet(this.trajetForm.value).subscribe({
        next: () => {
          alert('Trajet proposé avec succès !');
          this.router.navigate(['/trajets']);
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de l\'envoi du trajet.');
        }
      });
    }
  }
}
