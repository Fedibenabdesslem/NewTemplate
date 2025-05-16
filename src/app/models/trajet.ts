export interface Trajet {
  id?: number; 
  userId: number; 
  startLocation: string;
  endLocation: string;
  departureTime: string; 
  availableSeats: number;
  allowsLuggage: boolean;
  allowsMusic: boolean;
  price: number;
  createdAt?: string; 
}
