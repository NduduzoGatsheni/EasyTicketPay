import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverTabsPageRoutingModule } from './driver-tabs-routing.module';

import { DriverTabsPage } from './driver-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverTabsPageRoutingModule
  ],
  declarations: [DriverTabsPage]
})
export class DriverTabsPageModule {}
