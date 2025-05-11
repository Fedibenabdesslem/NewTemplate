export interface Trajet {
  id?: number; // facultatif, car généré par la base
  userId: number; // l'identifiant du conducteur (User)
  startLocation: string;
  endLocation: string;
  departureTime: string; // format ISO: '2025-05-12T14:30:00'
  availableSeats: number;
  allowsLuggage: boolean;
  allowsMusic: boolean;
  createdAt?: string; // facultatif, généré par le backend
}
