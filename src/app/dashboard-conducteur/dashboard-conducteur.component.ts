import { Component, OnInit } from '@angular/core';
import { TrajetService } from '../services/tarjet.service';
import { Trajet } from '../models/trajet'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common';
import { ProposerTrajetComponent } from "../proposer-tarjet/proposer-tarjet.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-conducteur-dashboard',
  templateUrl: './dashboard-conducteur.component.html',
  styleUrls: ['./dashboard-conducteur.component.css'],
  imports: [CommonModule, ProposerTrajetComponent, RouterLink],
})
export class ConducteurDashboardComponent implements OnInit {
  section = 'trajets';
  trajets: Trajet[] = [];

  constructor(private trajetService: TrajetService) {}

  ngOnInit(): void {
  this.rafraichirTrajets();
}

rafraichirTrajets() {
  this.trajetService.getTrajetsByConducteur().subscribe(data => {
    this.trajets = data;
  });
}

  modifierTrajet(trajet: Trajet) {
    // logiques pour ouvrir un formulaire de modification
    console.log('Modifier trajet:', trajet);
  }

  supprimerTrajet(id: number) {
    this.trajetService.supprimerTrajet(id).subscribe(() => {
      this.rafraichirTrajets();
    });
  }
}
