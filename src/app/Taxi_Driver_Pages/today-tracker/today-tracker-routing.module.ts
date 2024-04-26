import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayTrackerPage } from './today-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: TodayTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayTrackerPageRoutingModule {}
