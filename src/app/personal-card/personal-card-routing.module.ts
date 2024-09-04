import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalCardPage } from './personal-card.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalCardPageRoutingModule {}
