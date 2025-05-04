import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TrajetComponent } from './trajets/trajets.component';
import { DashboardAdminComponent  } from './dashboard-admin/dashboard-admin.component';
import { PassengerDashboardComponent } from './dashboard-passager/dashboard-passager.component';
import {DashboardConducteurComponent } from './dashboard-conducteur/dashboard-conducteur.component';
import { RegisterComponent } from './register/register.component';
import { ProposerTrajetComponent } from './proposer-tarjet/proposer-tarjet.component';

export const routes: Routes = [

    {path : '', redirectTo: 'home', pathMatch: 'full'},
    {path : 'home', component : HomeComponent},
    {path : 'trajets', component :TrajetComponent},
    {path : 'login', component : LoginComponent},
    {path : 'admin' ,component :DashboardAdminComponent },
    {path :'conducteur',component : DashboardConducteurComponent},
    {path : 'passager',component :PassengerDashboardComponent},
    {path : 'register', component :RegisterComponent},
    {path : 'proposer-trajet', component : ProposerTrajetComponent},
    {path : 'payment', loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent)},
    {path : '**', redirectTo: 'home'}
    
];
