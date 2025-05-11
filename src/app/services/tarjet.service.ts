import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trajet } from '../models/trajet'; // ✅ Assure-toi que ce chemin est correct

@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  private apiUrl = 'http://localhost:8085/trajets';

  constructor(private http: HttpClient) {}

  // 🔐 Récupération du token JWT depuis le localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // 📤 Proposer un nouveau trajet
  proposerTrajet(trajet: Trajet): Observable<Trajet> {
    return this.http.post<Trajet>(this.apiUrl, trajet, { headers: this.getAuthHeaders() });
  }

  // 📥 Récupérer tous les trajets (pour les passagers par exemple)
  getTrajets(): Observable<Trajet[]> {
    return this.http.get<Trajet[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // 👤 Récupérer les trajets du conducteur connecté
  getTrajetsByConducteur(): Observable<Trajet[]> {
    return this.http.get<Trajet[]>(`${this.apiUrl}/mes-trajets`, { headers: this.getAuthHeaders() });
  }

  // ❌ Supprimer un trajet par ID
  supprimerTrajet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
