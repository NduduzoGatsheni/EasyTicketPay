import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VechileProfilePage } from './vechile-profile.page';

const routes: Routes = [
  {
    path: '',
    component: VechileProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VechileProfilePageRoutingModule {}
