import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

import { Router } from '@angular/router';  // <-- importer Router

import { UserService } from '../services/user.service';
import { Trajet } from '../models/trajet';
import { User } from '../models/user';
import { TrajetService } from '../services/trajet.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
  standalone: true,
  imports: [NgChartsModule],
})
export class DashboardAdminComponent implements OnInit {
  trajets: Trajet[] = [];
  users: User[] = [];
  selectedTab: string = 'trajets';

  totalUsers = 0;
  totalDrivers = 0;
  totalTrips = 0;

  constructor(
    private trajetService: TrajetService,
    private userService: UserService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loadTrajetsCount();
    this.loadUsers();
  }

  loadTrajetsCount(): void {
    this.trajetService.getTotalTrajetsAdmin().subscribe({
      next: count => {
        this.totalTrips = count;
      },
      error: err => console.error('Erreur lors du chargement du nombre de trajets :', err)
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        console.log('Réponse getAllUsers:', data);
        if (typeof data === 'number') {
          this.totalUsers = data;
          this.totalDrivers = 0;
          this.users = [];
        } else if (Array.isArray(data)) {
          this.users = data;
          this.totalUsers = this.users.length;
          this.totalDrivers = this.users.filter(u => u.role?.toLowerCase() === 'conducteur').length;
        } else if (data && Array.isArray((data as any).users)) {
          this.users = (data as any).users;
          this.totalUsers = this.users.length;
          this.totalDrivers = this.users.filter(u => u.role?.toLowerCase() === 'conducteur').length;
        } else {
          this.users = [];
          this.totalUsers = 0;
          this.totalDrivers = 0;
        }
      },
      error: err => console.error('Erreur lors du chargement des utilisateurs :', err)
    });
  }

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai'],
    datasets: [
      {
        data: [15, 30, 20, 40, 50],
        label: 'Utilisateurs inscrits',
        backgroundColor: '#42a5f5'
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  barChartType: 'bar' = 'bar';

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  // Méthodes de navigation pour redirection au clic
  goToUsersList(): void {
    this.router.navigate(['/liste-users']);  // modifier si besoin
  }

  goToTripsList(): void {
    this.router.navigate(['/liste-trajets']);  // modifier si besoin
  }
}
