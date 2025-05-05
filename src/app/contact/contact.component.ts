import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-header',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactHeaderComponent {
  isContactOpen = false;

  toggleContactMenu() {
    this.isContactOpen = !this.isContactOpen;
  }

  startCall() {
    console.log("Lancement de l'appel...");
    // Implémentez la logique d'appel
    window.location.href = "tel:+21670123456";
  }

  openChat() {
    console.log("Ouverture du chat...");
    // Implémentez l'ouverture du chat
  }
}