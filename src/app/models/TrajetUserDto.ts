export interface TrajetUserDto {
  id: number;
  startLocation: string;
  endLocation: string;
  departureTime: string; 
  availableSeats: number;
  createdAt: string;     

  allowsLuggage: boolean;
  allowsMusic: boolean;

  firstName: string;
  lastName: string;
  phoneNumber: string;
}
