// src/app/components/proposer-trajet/proposer-trajet.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Trajet, TrajetService } from '../services/tarjet.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-proposer-trajet',
  templateUrl: './proposer-tarjet.component.html',
  styleUrls: ['./proposer-tarjet.component.css'],
  imports: [ReactiveFormsModule,CommonModule]
})
export class ProposerTrajetComponent {
  trajetForm: FormGroup;
  successMessage = '';

  constructor(private fb: FormBuilder, private trajetService: TrajetService) {
    this.trajetForm = this.fb.group({
      conducteurId: [1, Validators.required], // ID simulé pour l'exemple
      depart: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
      nombreDePlaces: [1, [Validators.required, Validators.min(1)]],
      prix: [0, [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.trajetForm.valid) {
      const trajet: Trajet = this.trajetForm.value;
      this.trajetService.proposerTrajet(trajet).subscribe({
        next: (response) => {
          this.successMessage = 'Trajet proposé avec succès !';
          this.trajetForm.reset({ conducteurId: 1 });
        },
        error: (err) => console.error('Erreur lors de la proposition :', err)
      });
    }
  }
}
