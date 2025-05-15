import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AdminStatistics } from '../models/admin-statistics';
import { ConducteurStatistics } from '../models/conducteur-statistics';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8085/statistics';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

 // 🎯 Récupérer les statistiques du conducteur typées
getConducteurStatistics(conducteurId: number): Observable<ConducteurStatistics> {
  const params = new HttpParams().set('conducteurId', conducteurId.toString());
  return this.http.get<ConducteurStatistics>(`${this.apiUrl}/conducteur`, {
    headers: this.getAuthHeaders(),
    params: params
  });
}


  // 🎯 Récupérer les statistiques de l’admin typées
  getAdminStatistics(): Observable<AdminStatistics> {
    return this.http.get<AdminStatistics>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }
}
