
// import { Component, OnInit } from '@angular/core';
// import { ServiceService } from '../shared/service.service';
// import { passenger } from '../service/passenger';
// import { take } from 'rxjs/operators';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-pay',
//   templateUrl: './pay.page.html',
//   styleUrls: ['./pay.page.scss'],
// })
// export class PayPage implements OnInit {

//   amount!: string;
//   name: string = '';
//   uid!: string;
//   passenger: passenger;
//   updatedBalance: number = 0;
//   passengerSubscription: Subscription | undefined;
//   handler: any = null;
//   paymentData: any = {
//     email: '',
//     amount: 0,
//   };

//   constructor(private serv: ServiceService) {
//     this.passenger = {
//       passengerId: '',
//       passengerNames: '',
//       passengerEmail: '',
//       passengerPassword: ''  
//     };
//   }

//   ngOnInit() {
//     this.passenger = this.serv.getData();
//     this.name = this.passenger.passengerNames;
//     console.log('Retrieved passenger:', this.passenger);
//     if (this.passenger.passengerId) {
//       this.subscribeToPassengerUpdates(this.passenger.passengerId);
//     } else {
//       console.error('Passenger ID is missing in the retrieved data');
//     }
//     this.loadStripe();
//   }
//   ngOnDestroy() {
//     if (this.passengerSubscription) {
//       this.passengerSubscription.unsubscribe();
//     }
//   }
//   subscribeToPassengerUpdates(passengerId: string) {
//     this.passengerSubscription = this.serv.getPassengerById(passengerId).subscribe(passenger => {
//       if (passenger) {
//         this.passenger = passenger;
//         this.name = passenger.passengerNames;
//         this.updatedBalance = passenger.balance || 0;
//         console.log('Passenger retrieved:', passenger);
//       } else {
//         console.error('No passenger found with ID:', passengerId);
//       }
//     });
//   }
//   pay() {
//     const amount = this.paymentData.amount * 100; // Convert amount to cents

//     const handler = (<any>window).StripeCheckout.configure({
//       key: 'pk_test_51PRAGZEwp4oV1bz67bXzSXUoyc0kVk5qX38V5p93uxa9RhpBU8QCIvyQ1y4nqkuPfqfzXWVClM7w8iAM4KihF7Ch00y4dd0OQY',
//       locale: 'auto',
//       token: (token: any) => { // Use arrow function here
//         console.log(token);
//         alert('Token Created!!');
//         this.update(); // Now `this` correctly refers to the class instance
//       }
//     });

//     handler.open({
//       name: 'EasyTicketPay',
//       description: 'Transport Ticket Payment',
//       amount: amount,
//       email: this.paymentData.email
//     });
//   }

//   loadStripe() {
//     if (!window.document.getElementById('stripe-script')) {
//       const s = window.document.createElement('script');
//       s.id = 'stripe-script';
//       s.type = 'text/javascript';
//       s.src = 'https://checkout.stripe.com/checkout.js';
//       s.onload = () => {
//         this.handler = (<any>window).StripeCheckout.configure({
//           key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
//           locale: 'auto',
//           token: (token: any) => { // Use arrow function here too
//             console.log(token);
//             alert('Payment Success!!');
//           }
//         });
//       };

//       window.document.body.appendChild(s);
//     }
//   }

//   update() {
//     const passengerId = this.passenger.passengerId;
//     console.log('Updating passenger with ID:', passengerId);

//     if (!passengerId) {
//       console.error('Passenger ID is empty or undefined');
//       return;
//     }

//     this.serv.getPassengerById(passengerId).pipe(take(1)).subscribe(existingPassenger => {
//       if (existingPassenger) {
//         const currentBalance = existingPassenger.balance || 0;
//         const newAmount = parseFloat(this.paymentData.amount) || 0;
//         const newBalance = currentBalance + newAmount;

//         const updatedPassenger: passenger = { ...existingPassenger, balance: newBalance };

//         this.serv.updatePassenger(passengerId, updatedPassenger).then(() => {
//           console.log('Passenger updated successfully');
//           this.updatedBalance = newBalance; // Update the balance displayed on the screen
//         }).catch(error => {
//           console.error('Error updating passenger', error);
//         });
//       } else {
//         console.error('No passenger found with ID:', passengerId);
//       }
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { AuthService } from '../shared/auth.service';
import { passenger } from '../service/passenger';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  amount!: string;
  name: string = '';
  uid!: string;
  passenger: passenger;
  updatedBalance: number = 0;
  passengerSubscription: Subscription | undefined;
  handler: any = null;
  paymentData: any = {
    email: '',
    amount: 0,
  };
  user: User | null = null; 

  constructor(private authService: AuthService,private serv: ServiceService, private route: ActivatedRoute,private router: Router) {
    this.passenger = {
      passengerId: '',
      passengerNames: '',
      passengerEmail: '',
      passengerPassword: ''  
    };
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.uid = user.uid;
        console.log('Current User UID:', this.uid);
        this.subscribeToPassengerUpdates(this.uid);
        this.loadStripe();
      } else {
        console.log('User not logged in.');
    
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnDestroy() {
    if (this.passengerSubscription) {
      this.passengerSubscription.unsubscribe();
    }
  }

  subscribeToPassengerUpdates(passengerId: string) {
    this.passengerSubscription = this.serv.getPassengerById(passengerId).subscribe(passenger => {
      if (passenger) {
        this.passenger = passenger;
        this.name = passenger.passengerNames;
        this.updatedBalance = passenger.balance || 0;
        console.log('Passenger retrieved:', passenger);
      } else {
        console.error('No passenger found with ID:', passengerId);
      }
    });
  }

  pay() {
    const amount = this.paymentData.amount * 100;

    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51PRAGZEwp4oV1bz67bXzSXUoyc0kVk5qX38V5p93uxa9RhpBU8QCIvyQ1y4nqkuPfqfzXWVClM7w8iAM4KihF7Ch00y4dd0OQY',
      locale: 'auto',
      token: (token: any) => {
        console.log(token);
        alert('Token Created!!');
        this.update();
      }
    });

    handler.open({
      name: 'EasyTicketPay',
      description: 'Transport Ticket Payment',
      amount: amount,
      email: this.paymentData.email
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',
          token: (token: any) => {
            console.log(token);
            alert('Payment Success!!');
          }
        });
      };

      window.document.body.appendChild(s);
    }
  }

  update() {
    const passengerId = this.passenger.passengerId;
    console.log('Updating passenger with ID:', passengerId);

    if (!passengerId) {
      console.error('Passenger ID is empty or undefined');
      return;
    }

    this.serv.getPassengerById(passengerId).pipe(take(1)).subscribe(existingPassenger => {
      if (existingPassenger) {
        const currentBalance = existingPassenger.balance || 0;
        const newAmount = parseFloat(this.paymentData.amount) || 0;
        const newBalance = currentBalance + newAmount;

        const updatedPassenger: passenger = { ...existingPassenger, balance: newBalance };

        this.serv.updatePassenger(passengerId, updatedPassenger).then(() => {
          console.log('Passenger updated successfully');
          this.updatedBalance = newBalance;
        }).catch(error => {
          console.error('Error updating passenger', error);
        });
      } else {
        console.error('No passenger found with ID:', passengerId);
      }
    });
  }
}

