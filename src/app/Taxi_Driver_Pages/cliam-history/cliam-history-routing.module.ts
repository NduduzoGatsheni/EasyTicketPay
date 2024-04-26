import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CliamHistoryPage } from './cliam-history.page';

const routes: Routes = [
  {
    path: '',
    component: CliamHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CliamHistoryPageRoutingModule {}
