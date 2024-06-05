import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignVehiclePageRoutingModule } from './sign-vehicle-routing.module';

import { SignVehiclePage } from './sign-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignVehiclePageRoutingModule
  ],
  declarations: [SignVehiclePage]
})
export class SignVehiclePageModule {}
