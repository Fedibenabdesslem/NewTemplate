import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TrajetsComponent } from './trajets/trajets.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { PassengerDashboardComponent } from './dashboard-passager/dashboard-passager.component';
import { DashboardConducteurComponent } from './dashboard-conducteur/dashboard-conducteur.component';
import { RegisterComponent } from './register/register.component';
import { ProposerTrajetComponent } from './proposer-tarjet/proposer-tarjet.component';
import { AuthGuard } from './guards/auth.guard'; // Importez le AuthGuard

export const routes: Routes = [
  // Routes publiques
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'trajets', component: TrajetsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Routes protégées avec contrôle de rôle
  { 
    path: 'admin', 
    component: DashboardAdminComponent,
    canActivate: [AuthGuard],
    data: { 
      role: 'admin',
    } 
  },
  { 
    path: 'conducteur', 
    component: DashboardConducteurComponent,
    canActivate: [AuthGuard],
    data: { 
      role: 'conducteur',
    } 
  },
  { 
    path: 'passager', 
    component: PassengerDashboardComponent,
    canActivate: [AuthGuard],
    data: { 
      role: 'passager',
     
    } 
  },
  
  // Route protégée sans contrôle de rôle spécifique
  { 
    path: 'proposer-trajet', 
    component: ProposerTrajetComponent,
    canActivate: [AuthGuard] 
  },
  
  // Routes lazy-loaded
  { 
    path: 'payment', 
    loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactHeaderComponent) 
  }];