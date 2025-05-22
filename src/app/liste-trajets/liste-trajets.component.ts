import { Component, OnInit } from '@angular/core';
import { TrajetService } from '../services/trajet.service';
import { Trajet } from '../models/trajet'; // Assurez-vous que le chemin est correct
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-trajets',
  templateUrl: './liste-trajets.component.html'
  , styleUrls: ['./liste-trajets.component.css'],
  imports:[CommonModule]
})
export class ListeTrajetsComponent implements OnInit {
  trajets: Trajet[] = [];
  loading = true;
  constructor(private trajetService: TrajetService, private router: Router) {}

  ngOnInit(): void {
  this.trajetService.getAllTrajets().subscribe({
    next: (data) => {
      this.trajets = data;
      this.loading = false;
    },
    error: (err) => {
      console.error('Erreur lors de la récupération des trajets :', err);
      this.loading = false;
    }
  });
}


  

  voirDetails(trajet: Trajet): void {
    // Rediriger vers la page des détails du trajet
    console.log('Voir les détails du trajet', trajet);
    this.router.navigate(['/trajet', trajet.id]); // Ajuste cette route selon ta configuration
  }
}
