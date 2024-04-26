import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayTrackerPageRoutingModule } from './today-tracker-routing.module';

import { TodayTrackerPage } from './today-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayTrackerPageRoutingModule
  ],
  declarations: [TodayTrackerPage]
})
export class TodayTrackerPageModule {}
