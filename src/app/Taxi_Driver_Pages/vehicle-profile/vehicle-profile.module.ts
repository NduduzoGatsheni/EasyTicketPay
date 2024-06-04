import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleProfilePageRoutingModule } from './vehicle-profile-routing.module';

import { VehicleProfilePage } from './vehicle-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleProfilePageRoutingModule
  ],
  declarations: [VehicleProfilePage]
})
export class VehicleProfilePageModule {}
