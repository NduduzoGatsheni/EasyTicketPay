import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeeTrackerPage } from './fee-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: FeeTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeTrackerPageRoutingModule {}
