import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrajetService } from '../services/tarjet.service';
import { Trajet } from '../models/trajet'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule], 
})
export class ReservationComponent implements OnInit {
  trajet: Trajet | null = null;
  loading = true;
places: any;

  constructor(
    private trajetService: TrajetService,
    private route: ActivatedRoute,
    private router: Router // Inject the Router service
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.trajetService.getTrajets().subscribe({
        next: (data) => {
          this.trajet = data.find((trajet) => trajet.id === +id) || null;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du trajet', err);
          this.loading = false;
        }
      });
    }
  }

  // Ajouter la logique de réservation ici
   reserver(): void {
    if (this.trajet) {
      console.log('Réservation effectuée pour le trajet', this.trajet);
      
      // Logique de réservation (mettre à jour la base de données, etc.)
      
      // Redirige vers la page de paiement
      this.router.navigate(['/payment']);
    }
  }
}
