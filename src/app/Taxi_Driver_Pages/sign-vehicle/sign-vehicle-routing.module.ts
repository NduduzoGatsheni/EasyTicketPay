import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignVehiclePage } from './sign-vehicle.page';

const routes: Routes = [
  {
    path: '',
    component: SignVehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignVehiclePageRoutingModule {}
