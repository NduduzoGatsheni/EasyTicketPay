import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverTabsPage } from './driver-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: DriverTabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'analytics',
        loadChildren: () => import('../analytics/analytics.module').then(m => m.AnalyticsPageModule)
      },
      {
        path: 'today-tracker',
        loadChildren: () => import('../today-tracker/today-tracker.module').then(m => m.TodayTrackerPageModule)
      },
      {
        path: 'fee-tracker',
        loadChildren: () => import('../fee-tracker/fee-tracker.module').then(m => m.FeeTrackerPageModule)
      },
      {
        path: 'cliam-history', // Corrected typo from 'cliam-history'
        loadChildren: () => import('../cliam-history/cliam-history.module').then(m => m.CliamHistoryPageModule)
      },
      {
        path: 'scan-qr',
        loadChildren: () => import('../scan-qr/scan-qr.module').then( m => m.ScanQRPageModule)
      },
      {
        path: 'vehicle-profile',
        loadChildren: () => import('../vehicle-profile/vehicle-profile.module').then( m => m.VehicleProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'driver-tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverTabsPageRoutingModule {}
