import { Component, OnInit } from '@angular/core';

import { ReclamationService } from '../services/reclamation.service';
import { Trajet } from '../models/trajet';
import { Reclamation } from '../models/reclamation';
import { TrajetService } from '../services/tarjet.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { routes } from '../app.routes';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-passager',
  templateUrl: './dashboard-passager.component.html',
  styleUrls: ['./dashboard-passager.component.css'],
  imports: [CommonModule,FormsModule,RouterLink],
})
export class DashboardPassagerComponent implements OnInit {
  trajets: Trajet[] = [];
  reclamationMessage: string = '';
  selectedTrajet?: Trajet;
  successMessage: string = '';
  errorMessage: string = '';
  section: 'trajets' | 'reclamation' = 'trajets';


  constructor(
    private trajetService: TrajetService,
    private reclamationService: ReclamationService,
    private router: Router
  ) {}
  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.loadTrajets();
  }

  loadTrajets(): void {
    this.trajetService.getTrajets().subscribe({
      next: data => this.trajets = data,
      error: err => console.error('Erreur chargement trajets', err)
    });
  }

  openReclamationForm(trajet: Trajet): void {
    this.selectedTrajet = trajet;
    this.reclamationMessage = '';
    this.successMessage = '';
    this.errorMessage = '';
  }

  sendReclamation(): void {
    if (!this.selectedTrajet) return;

    const reclamation: Reclamation = {
      trajetId: this.selectedTrajet.id!,
      conducteurId: this.selectedTrajet.userId,
      message: this.reclamationMessage.trim()
    };

    if (!reclamation.message) {
      this.errorMessage = 'Veuillez écrire un message avant d’envoyer la réclamation.';
      return;
    }

    this.reclamationService.sendReclamation(reclamation).subscribe({
      next: () => {
        this.successMessage = 'Réclamation envoyée avec succès.';
        this.reclamationMessage = '';
        this.selectedTrajet = undefined;
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l’envoi de la réclamation. Réessayez plus tard.';
      }
    });
  }

  cancelReclamation(): void {
    this.selectedTrajet = undefined;
    this.reclamationMessage = '';
    this.successMessage = '';
    this.errorMessage = '';
  }
}
