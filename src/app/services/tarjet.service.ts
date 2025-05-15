import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trajet } from '../models/trajet'; 
import { TrajetUserDto } from '../models/TrajetUserDto';

@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  private apiUrl = 'http://localhost:8085/trajets';

  constructor(private http: HttpClient) {}

  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  
  proposerTrajet(trajet: Trajet): Observable<Trajet> {
    return this.http.post<Trajet>(this.apiUrl, trajet, { headers: this.getAuthHeaders() });
  }

  
  getTrajets(): Observable<Trajet[]> {
    return this.http.get<Trajet[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getTrajetById(id: number): Observable<TrajetUserDto> {
    return this.http.get<TrajetUserDto>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // 👤 Récupérer les trajets du conducteur connecté
  getTrajetsByConducteur(): Observable<Trajet[]> {
    return this.http.get<Trajet[]>(`${this.apiUrl}/mes-trajets`, { headers: this.getAuthHeaders() });
  }

 
  supprimerTrajet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  modifierTrajet(id: number, trajet: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

  return this.http.put(`${this.apiUrl}/${id}`, trajet, { headers });
}


}
