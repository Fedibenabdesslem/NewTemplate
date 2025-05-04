import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proposer-trajet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proposer-tarjet.component.html',
  styleUrls: ['./proposer-tarjet.component.css']
})
export class ProposerTrajetComponent {
  trajetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.trajetForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      seats: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.trajetForm.valid) {
      const newTrip = this.trajetForm.value;
      console.log('Nouveau trajet proposé :', newTrip);
      alert("Trajet proposé avec succès !");
      this.trajetForm.reset();
    } else {
      alert("Veuillez remplir tous les champs requis.");
    }
  }
}
