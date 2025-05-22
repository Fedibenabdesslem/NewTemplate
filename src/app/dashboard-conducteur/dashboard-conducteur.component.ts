import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { TrajetService } from '../services/trajet.service';
import { StatisticsService } from '../services/statistics.service';
import { Trajet } from '../models/trajet';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ProposerTrajetComponent } from '../proposer-tarjet/proposer-tarjet.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-conducteur-dashboard',
  standalone: true,
  templateUrl: './dashboard-conducteur.component.html',
  styleUrls: ['./dashboard-conducteur.component.css'],
  imports: [CommonModule, RouterModule, NgChartsModule, ProposerTrajetComponent,RouterLink],
})
export class ConducteurDashboardComponent implements OnInit {
  section: 'trajets' | 'proposer' | 'stats' = 'trajets';
  trajets: Trajet[] = [];

  topTrajets: Trajet[] = [];
  trajetsPasses: Trajet[] = [];

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Top trajets par places disponibles' }
    }
  };

  constructor(
    private trajetService: TrajetService,
    private statisticsService: StatisticsService,
    private router: Router
  ) {}
  logout(): void {
  localStorage.clear(); // ou removeItem('token') / removeItem('userId') selon ce que tu stockes
  this.router.navigate(['/login']);
}

  ngOnInit(): void {
    this.rafraichirTrajets();
    this.chargerStatistiques();
  }

  rafraichirTrajets(): void {
    this.trajetService.getTrajetsByConducteur().subscribe(data => {
      this.trajets = data;
    });
  }

  supprimerTrajet(id: number): void {
    this.trajetService.supprimerTrajet(id).subscribe(() => {
      this.rafraichirTrajets();
    });
  }

  chargerStatistiques(): void {
    const conducteurId = Number(localStorage.getItem('userId'));
    if (!conducteurId) {
      console.error('ID du conducteur non trouvé.');
      return;
    }

    this.statisticsService.getConducteurStatistics(conducteurId).subscribe(data => {
      this.topTrajets = data.topTrajets || [];
      this.trajetsPasses = data.trajetsPasses || [];

      this.barChartData = {
        labels: this.topTrajets.map((trajet, index) =>
          `${trajet.startLocation} → ${trajet.endLocation}`
        ),
        datasets: [{
          data: this.topTrajets.map(trajet => trajet.availableSeats ?? 0),
          label: 'Places disponibles',
          backgroundColor: '#42A5F5'
        }]
      };

      console.log('BarChart labels', this.barChartData.labels);
      console.log('BarChart data', this.barChartData.datasets[0]?.data);
    }, error => {
      console.error('Erreur de récupération des statistiques', error);
    });
  }
}
