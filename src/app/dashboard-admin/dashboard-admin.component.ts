import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
  imports: [NgChartsModule],
})
export class DashboardAdminComponent {
  totalUsers = 150;
  totalDrivers = 45;
  totalTrips = 320;

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai'],
    datasets: [
      { data: [15, 30, 20, 40, 50], label: 'Utilisateurs inscrits', backgroundColor: '#42a5f5' }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    }
  };

  barChartType: 'bar' = 'bar';
}
