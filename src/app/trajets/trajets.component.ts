import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-trajet',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink],
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})
export class TrajetComponent {
  trajets = [
    {
      id: 1,
      depart: 'Paris',
      arrivee: 'Lyon',
      date: '2023-12-15',
      heure: '08:00',
      places: 3,
      prix: 25,
      conducteur: {
        nom: 'Jean D.',
        note: 4.8,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      vehicule: 'Peugeot 308 (Noire)'
    },
    {
      id: 2,
      depart: 'Marseille',
      arrivee: 'Nice',
      date: '2023-12-16',
      heure: '09:30',
      places: 2,
      prix: 15,
      conducteur: {
        nom: 'Marie L.',
        note: 4.9,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      vehicule: 'Renault Clio (Blanche)'
    },
    {
      id: 3,
      depart: 'Bordeaux',
      arrivee: 'Toulouse',
      date: '2023-12-17',
      heure: '14:00',
      places: 4,
      prix: 20,
      conducteur: {
        nom: 'Pierre M.',
        note: 4.7,
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
      },
      vehicule: 'Citroën C4 (Bleue)'
    }
  ];

  reserverTrajet(trajetId: number) {
    console.log(`Réservation du trajet ${trajetId}`);
    // Ici vous pourriez ajouter la logique de navigation vers la page de réservation
  }
}