import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendingPaymentPage } from './sending-payment.page';

const routes: Routes = [
  {
    path: '',
    component: SendingPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendingPaymentPageRoutingModule {}
