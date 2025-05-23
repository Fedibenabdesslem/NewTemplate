import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TrajetService } from '../services/trajet.service';
import { CommonModule } from '@angular/common';
import { TrajetUserDto } from '../models/TrajetUserDto';


import { FactureService } from '../services/factrure.service';
import { AuthService } from '../services/auth.Service';

@Component({
  selector: 'app-trajet-details',
  templateUrl: './trajet-details.component.html',
  styleUrls: ['./trajet-details.component.css'],
  standalone: true,
  imports: [CommonModule,RouterLink],
})
export class TrajetDetailsComponent implements OnInit {
  trajet: TrajetUserDto | null = null;
  loading = true;

  constructor(
    private trajetService: TrajetService,
    private route: ActivatedRoute,
    private factureService: FactureService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = parseInt(idParam, 10);

      this.trajetService.getTrajetById(id).subscribe({
        next: (data) => {
          this.trajet = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du trajet', err);
          this.loading = false;
        }
      });
    } else {
      console.error('ID de trajet manquant ou invalide dans l’URL');
      this.loading = false;
    }
  }

  
  }

