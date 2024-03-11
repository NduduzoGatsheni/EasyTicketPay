import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  name = 'User';
  balance = 100;
  totalTrips = 5;
  cards = [
    { name: 'Tax', balance: 50 },
    { name: 'Bus', balance: 75 }
  ];
  constructor() {}

}
