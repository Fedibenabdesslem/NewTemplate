import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
//import autoTable from 'jspdf-autotable'; // facultatif si tu veux des tableaux

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  generateFacture(trajet: any, user: any) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Facture de paiement', 10, 10);

    doc.setFontSize(12);
    doc.text(`Date : ${new Date().toLocaleDateString()}`, 10, 20);

    doc.text('--- Informations du passager ---', 10, 30);
    doc.text(`Email : ${user.email}`, 10, 40);

    doc.text('--- Détails du trajet ---', 10, 50);
    doc.text(`Départ : ${trajet.startLocation}`, 10, 55);
    doc.text(`Arrivée : ${trajet.endLocation}`, 10, 60);
    doc.text(`Date départ : ${trajet.departureTime}`, 10, 65);
    doc.text(`Nombre de places : ${trajet.availableSeats}`, 10, 70);
    doc.text(`Prix : ${trajet.price} TND`, 10, 75);

    doc.text('--- Conducteur ---', 10, 85);
    doc.text(`Nom : ${trajet.firstName} ${trajet.lastName}`, 10, 90);
    doc.text(`Téléphone : ${trajet.phoneNumber}`, 10, 95);

    
    doc.save(`facture_trajet_${trajet.id}.pdf`);
  }
}
