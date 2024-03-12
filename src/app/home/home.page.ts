import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  name = 'User';
  balance = 100;
  totalTrips = 5;
  cards = [
    { name: 'Tax', balance: 50 },
    { name: 'Bus', balance: 75 }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
