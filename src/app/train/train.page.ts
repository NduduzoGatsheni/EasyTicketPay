import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-train',
  templateUrl: './train.page.html',
  styleUrls: ['./train.page.scss'],
})
export class TrainPage implements OnInit {
  transactions: any[] = [];
  groupedTransactions: Record<string, any[]> = {};
  passengerId: string = '';
  queryParamsSubscription: Subscription | undefined;

  constructor(private service: ServiceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const data = params['uid'];
      if (data) {
        this.passengerId = data;
      }
    });
    this.loadTransactions();
  }

  loadTransactions() {
    const DateConstructor = Date;
    this.service.getTransactionsById(this.passengerId).pipe(
      map(actions => actions.map((a:any) => {
        const data: any = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(transactions => {
      this.transactions = [];
      for (const transaction of transactions) {
        const date = transaction.datetime;
        transaction.datetime = this.formatDate(date);
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
      const [date, time] = transaction.datetime.split(', ');
      transaction.datetime = time;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {} as Record<string, any[]>);
  }
}
