// src/app/services/reservation.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ReservationRequest {
  trajetId: number;
  passengerId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8085/reservations';

  constructor(private http: HttpClient) {}

  createReservation(request: ReservationRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}`, request);
  }
  getTrajetById(id: number): Observable<any> {
    return this.http.get<any>(`/api/trajets/${id}`);
  }


}

