import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverTransactionsPage } from './driver-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: DriverTransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverTransactionsPageRoutingModule {}
