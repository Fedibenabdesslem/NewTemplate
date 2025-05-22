import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8085/profile/user'; // Pour getUserById
  private allUsersUrl = 'http://localhost:8085/profile/users'; // Pour getAllUsers

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token non trouvé dans le localStorage');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`
    });
  }

  getUserById(id: number | undefined): Observable<User> {
    if (id == null) {
      console.error('ID utilisateur invalide ou manquant');
      return throwError(() => new Error('ID utilisateur invalide ou manquant'));
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url, {
      headers: this.getAuthHeaders()
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.allUsersUrl, {
      headers: this.getAuthHeaders()
    });
  }
}
