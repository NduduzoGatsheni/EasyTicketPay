import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { passenger } from '../service/passenger';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  amount!:number;
  name:string='';
  uid!:string;
  passenger: passenger;
  constructor(private serv:ServiceService) {
    this.passenger = {
      passengerId: '',
      passengerNames: '',
      passengerEmail: '',
      passengerPassword: ''
      
    };
  }

  ngOnInit() {  
      this.passenger = this.serv.getData();
      this.name = this.passenger.passengerNames;
  }



}
