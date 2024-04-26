import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeeTrackerPageRoutingModule } from './fee-tracker-routing.module';

import { FeeTrackerPage } from './fee-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeeTrackerPageRoutingModule
  ],
  declarations: [FeeTrackerPage]
})
export class FeeTrackerPageModule {}
