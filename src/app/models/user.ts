export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  userType: 'PASSAGER' | 'CONDUCTEUR';
  createdAt: string;
  
  token: string;
  role: 'admin' | 'passager' | 'conducteur';
}
