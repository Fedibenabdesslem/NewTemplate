import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-driver-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard-conducteur.component.html',
  styleUrls: ['./dashboard-conducteur.component.css'],
})
export class DashboardConducteurComponent {
  proposedTrips = [
    { id: 1, from: 'Tunis', to: 'Sousse', date: '2025-05-10', seats: 3, status: 'active' },
    { id: 2, from: 'Sfax', to: 'Djerba', date: '2025-05-15', seats: 2, status: 'completed' }
  ];

  tripRequests = [
    { id: 1, passenger: 'Ahmed Ben Ali', trip: 'Tunis → Sousse', seats: 1 },
    { id: 2, passenger: 'Fatma Ksouri', trip: 'Sfax → Djerba', seats: 2 }
  ];

  proposeTrip() {
    alert("Redirection vers le formulaire de création de trajet.");
  }

  respondToRequest(requestId: number, accepted: boolean) {
    if (accepted) {
      alert('Demande acceptée.');
    } else {
      alert('Demande refusée.');
    }
    this.tripRequests = this.tripRequests.filter(req => req.id !== requestId);
  }
}
