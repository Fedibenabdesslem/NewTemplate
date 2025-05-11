import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { TrajetService } from '../services/tarjet.service';

@Component({
  selector: 'app-proposer-trajet',
  templateUrl: './proposer-tarjet.component.html',
  styleUrls: ['./proposer-tarjet.component.css'],

  imports: [ReactiveFormsModule],
})
export class ProposerTrajetComponent {
  trajetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private trajetService: TrajetService,
    private router: Router
  ) {
    this.trajetForm = this.fb.group({
      userId: [1, Validators.required], // à remplacer dynamiquement si besoin
      startLocation: ['', Validators.required],
      endLocation: ['', Validators.required],
      departureTime: ['', Validators.required],
      availableSeats: [1, [Validators.required, Validators.min(1)]],
      allowsLuggage: [false],
      allowsMusic: [false]
    });
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
