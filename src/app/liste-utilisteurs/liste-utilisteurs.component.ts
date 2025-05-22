import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisteurs.component.html',
  styleUrls: ['./liste-utilisteurs.component.css'],
  imports:[CommonModule]
})
export class ListeUtilisateursComponent implements OnInit {
  users: User[] = [];
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs', err);
        this.loading = false;
      }
    });
  }
}
