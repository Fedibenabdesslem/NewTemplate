import { Trajet } from "./trajet";
export interface Reservation {
  id: number;
  trajet: Trajet;
  passenger: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  bookingStatus: string;
  createdAt: string;
  updatedAt?: string;
}
