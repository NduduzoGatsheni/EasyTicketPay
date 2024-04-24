import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessfullyPageRoutingModule } from './successfully-routing.module';

import { SuccessfullyPage } from './successfully.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessfullyPageRoutingModule
  ],
  declarations: [SuccessfullyPage]
})
export class SuccessfullyPageModule {}
