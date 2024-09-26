import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {

  cards = [
    { title: 'Income', count: 70, icon: 'cash-outline' },
    { title: 'Number of Passengers', count: 20, icon: 'people-outline' },
    { title: 'Nomber of Tips', count: 45, icon: 'car-outline' },
   
    // { title: '', count: 10, icon: 'map-outline' }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
