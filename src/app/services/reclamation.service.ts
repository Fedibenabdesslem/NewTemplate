import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reclamation } from '../models/reclamation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8085/reclamations';

  constructor(private http: HttpClient) {}

  sendReclamation(reclamation: Reclamation): Observable<any> {
    return this.http.post(this.apiUrl, reclamation);
  }
}
