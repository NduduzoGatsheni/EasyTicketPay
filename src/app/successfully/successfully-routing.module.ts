import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessfullyPage } from './successfully.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessfullyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessfullyPageRoutingModule {}
