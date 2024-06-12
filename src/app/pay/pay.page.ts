import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { passenger } from '../service/passenger';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  amount!:string;
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


  update() {
    const passengerId = this.passenger.passengerId;
  
    this.serv.getPassengerById(passengerId).pipe(take(1)).subscribe(existingPassenger => {
      if (existingPassenger) {
        const currentBalance = existingPassenger.balance || 0;  // Assuming balance is now a number
        const newAmount = parseFloat(this.amount) || 0; 
        const newBalance = currentBalance + newAmount;
  
        const updatedPassenger: passenger = { ...existingPassenger, balance: newBalance };
  
        this.serv.updatePassenger(passengerId, updatedPassenger).then(() => {
          console.log('Passenger updated successfully');
        }).catch(error => {
          console.error('Error updating passenger', error);
        });
      }
    });
  }
  



}
