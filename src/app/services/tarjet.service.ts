import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trajet {
  id?: number;
  conducteurId: number;
  depart: string;
  destination: string;
  date: string;
  heure: string;
  nombreDePlaces: number;
  prix: number;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrajetService {
  private apiUrl = 'http://localhost:8085/trajets';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token'); // Assure-toi que le token est bien stocké dans localStorage
  }

  proposerTrajet(trajet: Trajet): Observable<Trajet> {
    const token = this.getToken();
    console.log('Token:', token); // Vérifie si le token est récupéré correctement

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });



    return this.http.post<Trajet>(this.apiUrl, trajet, { headers });
  }
}
