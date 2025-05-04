import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-dashboard',
  templateUrl: './dashboard-passager.component.html',
  styleUrls: ['./dashboard-passager.component.css'],
  imports: [FormsModule,CommonModule],
})
export class PassengerDashboardComponent {
  constructor(private router: Router
  ) {}
  availableTrips = [
    { id: 1, from: 'Tunis', to: 'Sousse', date: '15/12/2023', time: '08:00', driver: 'Mohamed Ali', seats: 3, price: 15 },
    { id: 2, from: 'Sfax', to: 'Djerba', date: '18/12/2023', time: '14:30', driver: 'Ali Ben Amor', seats: 2, price: 20 }
  ];

  searchParams = {
    from: '',
    to: '',
    date: ''
  };

  searchTrips() {
    // TODO: Ajouter logique de recherche
    alert('Recherche simulée !');
  }

  bookTrip(tripId: number) {
    this.router.navigate(['/paiement'], { queryParams: { tripId } });
  }
}
