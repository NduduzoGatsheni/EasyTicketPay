import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleProfilePage } from './vehicle-profile.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleProfilePageRoutingModule {}
