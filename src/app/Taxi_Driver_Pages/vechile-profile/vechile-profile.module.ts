import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VechileProfilePageRoutingModule } from './vechile-profile-routing.module';

import { VechileProfilePage } from './vechile-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VechileProfilePageRoutingModule
  ],
  declarations: [VechileProfilePage]
})
export class VechileProfilePageModule {}
