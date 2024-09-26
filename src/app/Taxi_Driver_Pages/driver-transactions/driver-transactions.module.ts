import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverTransactionsPageRoutingModule } from './driver-transactions-routing.module';

import { DriverTransactionsPage } from './driver-transactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverTransactionsPageRoutingModule
  ],
  declarations: [DriverTransactionsPage]
})
export class DriverTransactionsPageModule {}
