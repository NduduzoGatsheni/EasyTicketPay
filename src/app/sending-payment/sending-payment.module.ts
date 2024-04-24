import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendingPaymentPageRoutingModule } from './sending-payment-routing.module';

import { SendingPaymentPage } from './sending-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendingPaymentPageRoutingModule
  ],
  declarations: [SendingPaymentPage]
})
export class SendingPaymentPageModule {}
