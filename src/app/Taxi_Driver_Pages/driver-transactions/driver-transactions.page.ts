// // import { Component, OnInit } from '@angular/core';

// // @Component({
// //   selector: 'app-driver-transactoins',
// //   templateUrl: './driver-transactoins.page.html',
// //   styleUrls: ['./driver-transactoins.page.scss'],
// // })
// // export class DriverTransactoinsPage implements OnInit {

// //   constructor() { }

// //   ngOnInit() {
// //   }

// // }
// import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AlertController } from '@ionic/angular';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// interface Transaction {
//   id: string;
//   Amount: number;
//   From_To: string;
//   TransactionID: string;
//   dateTime: string;
//   claimed: boolean;
// }

// @Component({
//   selector: 'app-driver-transactions',
//   templateUrl: 'driver-transactions.page.html',
//   styleUrls: ['driver-transactions.page.scss'],
// })
// export class DriverTransactionsPage implements OnInit {
//   transactions$: Observable<Transaction[]>;
//   totalAmount: number = 0;
//   driverId: string = 'DRIVER_ID'; // Replace with actual driver ID

//   constructor(
//     private firestore: AngularFirestore,
//     private alertController: AlertController
//   ) {}

//   ngOnInit() {
//     this.loadTransactions();
//   }

//   loadTransactions() {
//     this.transactions$ = this.firestore
//       .collection<Transaction>('transactions', ref => 
//         ref.where('VehicleId', '==', this.driverId).orderBy('dateTime', 'desc')
//       )
//       .snapshotChanges()
//       .pipe(
//         map(actions => actions.map(a => {
//           const data = a.payload.doc.data() as Transaction;
//           const id = a.payload.doc.id;
//           return { id, ...data };
//         })),
//         map(transactions => {
//           this.totalAmount = transactions.reduce((sum, transaction) => sum + transaction.Amount, 0);
//           return transactions;
//         })
//       );
//   }

//   async claimAmount(transaction: Transaction) {
//     const alert = await this.alertController.create({
//       header: 'Claim Amount',
//       message: `Are you sure you want to claim $${transaction.Amount.toFixed(2)}?`,
//       buttons: [
//         {
//           text: 'Cancel',
//           role: 'cancel'
//         },
//         {
//           text: 'Claim',
//           handler: () => {
//             this.firestore.doc(`transactions/${transaction.id}`).update({ claimed: true });
//           }
//         }
//       ]
//     });

//     await alert.present();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// interface Transaction {
//   id: string;
//   Amount: number;
//   From_To: string;
//   TransactionID: string;
//   dateTime: string;
//   claimed: boolean;
// }
interface Transaction {
  Amount: number;
  From_To: string;
  TransactionID: string;
  VehicleId: string;
  dateTime: string;
  passengerId: string;
  passengerEmail?: string;
  vehicleEmail?: string;
  claimed?: boolean;
}

@Component({
  selector: 'app-driver-transactions',
  templateUrl: 'driver-transactions.page.html',
  styleUrls: ['driver-transactions.page.scss'],
})
export class DriverTransactionsPage implements OnInit {
  private driverIdSubject = new BehaviorSubject<string>('DRIVER_ID'); // Replace 'DRIVER_ID' with actual initial value or empty string
  transactions$: Observable<Transaction[]>;
  totalAmount: number = 0;

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {
    this.transactions$ = this.driverIdSubject.pipe(
      switchMap(driverId => 
        this.firestore
          .collection<Transaction>('transactions', ref => 
            ref.where('VehicleId', '==', driverId).orderBy('dateTime', 'desc')
          )
          .snapshotChanges()
          .pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as Transaction;
              const iud = a.payload.doc.id;
              return { iud, ...data };
            })),
            map(transactions => {
              this.totalAmount = transactions.reduce((sum, transaction) => sum + transaction.Amount, 0);
              return transactions;
            })
          )
      )
    );
  }

  ngOnInit() {
    // If you need to set or update the driverId after initialization, you can do it here or in another method
    // this.setDriverId('NEW_DRIVER_ID');
  }

  setDriverId(driverId: string) {
    this.driverIdSubject.next(driverId);
  }

  async claimAmount(transaction: Transaction) {
    const alert = await this.alertController.create({
      header: 'Claim Amount',
      message: `Are you sure you want to claim $${transaction.Amount.toFixed(2)}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Claim',
          handler: () => {
            this.firestore.doc(`transactions/${transaction.TransactionID}`).update({ claimed: true });
          }
        }
      ]
    });

    await alert.present();
  }
}