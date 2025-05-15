import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getConducteurStatistics(conducteurId: number): Observable<any> {
    const params = new HttpParams().set('conducteurId', conducteurId.toString());
    return this.http.get<any>(`${this.apiUrl}?conducteurId=${conducteurId}`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }
}
