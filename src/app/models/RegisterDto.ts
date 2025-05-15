// src/app/models/register-dto.ts
// ou 'models/role' selon ton projet

import { Role } from "./role";

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  userType: Role;
}
