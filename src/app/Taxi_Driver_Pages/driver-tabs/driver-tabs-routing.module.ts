import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverTabsPage } from './driver-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: DriverTabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverTabsPageRoutingModule {}
