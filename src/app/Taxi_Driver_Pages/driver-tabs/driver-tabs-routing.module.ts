import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverTabsPage } from './driver-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: DriverTabsPage
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('../analytics/analytics.module').then( m => m.AnalyticsPageModule)
  },
  {
    path: 'today-tracker',
    loadChildren: () => import('../today-tracker/today-tracker.module').then( m => m.TodayTrackerPageModule)
  },
  {
    path: 'fee-tracker',
    loadChildren: () => import('../fee-tracker/fee-tracker.module').then( m => m.FeeTrackerPageModule)
  },
  {
    path: 'cliam-history',
    loadChildren: () => import('../cliam-history/cliam-history.module').then( m => m.CliamHistoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverTabsPageRoutingModule {}
