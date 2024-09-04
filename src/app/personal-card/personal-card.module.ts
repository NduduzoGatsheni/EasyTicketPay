import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalCardPageRoutingModule } from './personal-card-routing.module';

import { PersonalCardPage } from './personal-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalCardPageRoutingModule
  ],
  declarations: [PersonalCardPage]
})
export class PersonalCardPageModule {}
