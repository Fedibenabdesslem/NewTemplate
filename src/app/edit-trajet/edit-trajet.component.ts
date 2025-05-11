import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// Correction du nom du service
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrajetService } from '../services/tarjet.service';

@Component({
  selector: 'app-edit-trajet',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Les imports sont corrects ici
  templateUrl: './edit-trajet.component.html',
  styleUrls: ['./edit-trajet.component.css']
})
export class EditTrajetComponent implements OnInit {

  trajetForm!: FormGroup;
  trajetId!: number;

  constructor(
    private fb: FormBuilder,
    private trajetService: TrajetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  console.log('ID de trajet récupéré:', id); // Debugging
  this.trajetId = id ? +id : NaN;

  if (isNaN(this.trajetId)) {
    console.error('ID de trajet invalide');
    return;
  }

  // Initialisation du formulaire
  this.trajetForm = this.fb.group({
    startLocation: ['', Validators.required],
    endLocation: ['', Validators.required],
    departureTime: ['', Validators.required],
    availableSeats: [1, [Validators.required, Validators.min(1)]],
    allowsLuggage: [false],
    allowsMusic: [false]
  });

  this.loadTrajet(); // Chargement des données
}


  private loadTrajet(): void {
    this.trajetService.getTrajetById(this.trajetId).subscribe({
      next: (trajet) => {
        this.trajetForm.patchValue(trajet);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du trajet :', err);
        // Optionnel: Gérer l'erreur, par exemple en affichant un message à l'utilisateur
      }
    });
  }

  onSubmit(): void {
    if (this.trajetForm.valid) {
      this.trajetService.modifierTrajet(this.trajetId, this.trajetForm.value).subscribe({
        next: () => {
          // Navigation après mise à jour réussie
          this.router.navigate(['/conducteur']);
          alert('Trajet mis à jour avec succès !');
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
          // Optionnel: Afficher un message à l'utilisateur
        }
      });
    } else {
      // Vous pouvez ajouter une gestion des erreurs si le formulaire est invalide
      console.error('Formulaire invalide');
    }
  }
}
