import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trajet',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css'],
})
export class TrajetsComponent implements OnInit {
  trajets = [
    {
      id: 1,
      depart: 'Tunis',
      arrivee: 'Sousse',
      date: '2023-12-15',
      heure: '08:00',
      places: 3,
      prix: 15,
      conducteur: {
        nom: 'Mohamed S.',
        note: 4.7,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        vehicule: 'Peugeot 208 (Noire)',
        conforts: ['climatisation', 'wifi', 'bagages']
      },
      popularite: 85 // Nouveau: indicateur de popularité
    },
    {
      id: 2,
      depart: 'Sfax',
      arrivee: 'Djerba',
      date: '2023-12-16',
      heure: '10:30',
      places: 2,
      prix: 20,
      conducteur: {
        nom: 'Amina K.',
        note: 4.9,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        vehicule: 'Hyundai i20 (Blanche)',
        conforts: ['climatisation', 'animaux']
      },
      popularite: 92
    }
  ];

  villesTunisiennes = [
    'Tunis', 'Sousse', 'Sfax', 'Djerba', 
    'Nabeul', 'Bizerte', 'Monastir', 'Kairouan'
  ];

  searchParams = {
    depart: '',
    arrivee: '',
    date: '',
    conforts: []
  };

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  reserverTrajet(trajetId: number) {
    console.log(`Réservation du trajet ${trajetId}`);
    // Animation de confirmation
    const card = document.querySelector(`.trajet-card[data-id="${trajetId}"]`);
    card?.classList.add('reserved');
    setTimeout(() => {
      card?.classList.remove('reserved');
    }, 2000);
  }

  getPopulariteColor(pourcentage: number): string {
    if (pourcentage > 85) return '#2ecc71'; // Vert
    if (pourcentage > 70) return '#f39c12'; // Orange
    return '#e74c3c'; // Rouge
  }
}