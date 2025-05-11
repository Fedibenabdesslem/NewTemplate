import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrajetService } from '../services/tarjet.service';
import { Trajet } from '../models/trajet'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trajet-details',
  templateUrl: './trajet-details.component.html',
  styleUrls: ['./trajet-details.component.css'],
  imports: [CommonModule],
})
export class TrajetDetailsComponent implements OnInit {
  trajet: Trajet | null = null;
  loading = true;

  constructor(
    private trajetService: TrajetService,
    private route: ActivatedRoute
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
}
