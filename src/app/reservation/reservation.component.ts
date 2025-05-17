import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { AuthService } from '../services/auth.Service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ReservationComponent implements OnInit {
  trajetId!: number;
  message = '';
  isLoading = false;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.trajetId = +id;
      } else {
        this.message = "❌ Trajet non trouvé dans l'URL.";
      }
    });
  }

  reserver(): void {
    const passengerId = localStorage.getItem('userId');
    if (!passengerId) {
      this.message = "❌ Utilisateur non connecté.";
      return;
    }

    this.isLoading = true;
    this.reservationService.createReservation({
      trajetId: this.trajetId,
      passengerId: +passengerId
    }).subscribe({
      next: () => {
        this.message = '✅ Réservation effectuée avec succès !';
        this.isLoading = false;
      },
      error: () => {
        this.message = '❌ Erreur lors de la réservation.';
        this.isLoading = false;
      }
    });
  }
}
