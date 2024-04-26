import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CliamHistoryPageRoutingModule } from './cliam-history-routing.module';

import { CliamHistoryPage } from './cliam-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CliamHistoryPageRoutingModule
  ],
  declarations: [CliamHistoryPage]
})
export class CliamHistoryPageModule {}
