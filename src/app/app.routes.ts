import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

import { RegisterComponent } from './register/register.component';
import { ProposerTrajetComponent } from './proposer-tarjet/proposer-tarjet.component';
import { AuthGuard } from './guards/auth.guard'; // Importez le AuthGuard
import { ListeTrajetsComponent } from './liste-trajets/liste-trajets.component';
import { ConducteurDashboardComponent } from './dashboard-conducteur/dashboard-conducteur.component';
import { DashboardPassagerComponent } from './dashboard-passager/dashboard-passager.component';
import { ReservationComponent } from './reservation/reservation.component';


export const routes: Routes = [
  // Routes publiques
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'trajets', component:ListeTrajetsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation/:id', component: ReservationComponent },
{ path: 'reservation', component: ReservationComponent },
 {path: 'Mes trajets', component: ProposerTrajetComponent},
  {path: 'trajet/:id',
    loadComponent: () => import('./trajet-details/trajet-details.component').then(m => m.TrajetDetailsComponent)},

  
{
  path: 'edit-trajet/:id',
  loadComponent: () => import('./edit-trajet/edit-trajet.component').then(m => m.EditTrajetComponent)
},

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
    component: ConducteurDashboardComponent,
    canActivate: [AuthGuard],
    data: { 
      role: 'conducteur',
    } 
  },
  { 
    path: 'passager', 
    component: DashboardPassagerComponent,
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
  
  
  { 
    path: 'contact', 
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactHeaderComponent) 
  }];