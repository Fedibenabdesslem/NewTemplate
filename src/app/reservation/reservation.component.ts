import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { AuthService } from '../services/auth.Service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrajetService } from '../services/tarjet.service';
import { UserService } from '../services/user.service';
import { forkJoin } from 'rxjs';
import { FactureComponent } from "../facture/facture.component";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, FactureComponent]
})
export class ReservationComponent implements OnInit {
  trajetId!: number;
  message = '';
  isLoading = false;

  // Ces variables seront passées au composant app-facture
  trajetData: any;
  userData: any;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private trajetService: TrajetService,
    private userService: UserService
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
        // Réservation réussie, on récupère les infos pour la facture
        forkJoin({
          trajet: this.trajetService.getTrajetById(this.trajetId),
          user: this.userService.getUserById(+passengerId)
        }).subscribe({
          next: (result) => {
            this.trajetData = result.trajet;
            this.userData = result.user;
            this.message = '✅ Réservation effectuée avec succès !';
            this.isLoading = false;
          },
          error: () => {
            this.message = '✅ Réservation faite, mais erreur lors du chargement des infos pour la facture.';
            this.isLoading = false;
          }
        });
      },
      error: () => {
        this.message = '❌ Erreur lors de la réservation.';
        this.isLoading = false;
      }
    });
  }
}
