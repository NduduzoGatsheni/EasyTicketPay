import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceService } from '../shared/service.service';
import { map } from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-taxi',
  templateUrl: './taxi.page.html',
  styleUrls: ['./taxi.page.scss'],
})
export class TaxiPage implements OnInit {
  transactions: any[] = [];
  groupedTransactions: Record<string, any[]> = {};
  passengerId: string = '';
  queryParamsSubscription: Subscription | undefined;

  constructor(private service: ServiceService,private route: ActivatedRoute,public popoverController: PopoverController) {}

  ngOnInit() {

    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const  data= params['uid'];
      if(data){
        this.passengerId = data;
      }
      });
      this.loadTransactions();
  }

  loadTransactions() {
    const DateConstructor = Date;
   
    //note
    this.service.getTransactionsBy_PassengerId(this.passengerId).pipe(
      map(actions => actions.map((a:any) => {
        const data: any = a.payload.doc.data();

      

        const id = a.payload.doc.id;
        console.log(a.payload.doc);

        return { id, ...data };
      }))
    ).subscribe(transactions => {
      this.transactions = [];
      for (const transaction of transactions) {
        const date = transaction.datetime;
        transaction.datetime = this.formatDate(date);
        console.log(transaction);
        this.transactions.push(transaction);
      }
      this.transactions.sort((a, b) => {
        const dateA = new DateConstructor(a.date);
        const dateB = new DateConstructor(b.date);
        return dateA.getTime() - dateB.getTime();
      });
      this.groupTransactionsByDate();
    });
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    return new Date(date).toLocaleDateString('en-US', options);
  }
  groupTransactionsByDate() {
    this.groupedTransactions = this.transactions.reduce((acc, transaction) => {
      const [date, time] = transaction.dateTime.split(', ');
      const vehicleId = transaction.VehicleId; // Assuming vehicleId is a property in the transaction object
  
      // Assigning the time and vehicleId back to the transaction object for easier access later
      transaction.datetime = time;
      transaction.VehicleId = vehicleId;
  alert(transaction.VehicleId);
      // Check if this date already exists in the accumulator
      if (!acc[date]) {
        acc[date] = [];
      }
  
      // Push the transaction with vehicleId to the corresponding date group
      acc[date].push(transaction);
  
      return acc;
    }, {} as Record<string, any[]>);
  }
  
  // groupTransactionsByDate() {
  //   this.groupedTransactions = this.transactions.reduce((acc, transaction) => {
  //     const [date, time] = transaction.dateTime.split(', ');
  //     transaction.datetime = time;
  //     if (!acc[date]) {
  //       acc[date] = [];
  //     }
  //     acc[date].push(transaction);

  //     return acc;
  //   }, {} as Record<string, any[]>);
  // }


  async presentPopover(ev: any, uid: string) {
    const popover = await this.popoverController.create({
      component: StarRatingComponent,
      event: ev,
      translucent: true,
      componentProps: {
        uid: uid,
      }
    });
    return await popover.present();
  }
}
