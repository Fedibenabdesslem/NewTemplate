import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactureService } from '../services/factrure.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FactureComponent {
  @Input() trajet: any;
  @Input() user: any;

  constructor(private factureService: FactureService) {}

  telechargerFacture(): void {
    if (this.trajet && this.user) {
      this.factureService.generateFacture(this.trajet, this.user);
    }
  }
}
