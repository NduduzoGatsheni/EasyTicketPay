import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { AuthService } from '../shared/auth.service';
import { passenger } from '../service/passenger';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  uid: string | null = null;
  name: string = '';
  user: User | null = null; 
  balance = 100;
  totalTrips = 5;

  currentUser: any | null = null;
  passenger: string = '';

  pass: passenger = {
    passengerId: '',
    passengerNames: '',
    passengerEmail: '',
    passengerPassword: '',
    balance:0
  };

  constructor(private authService: AuthService, private serv: ServiceService, private router: Router) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.uid = user.uid;
        console.log('Current User UID:', this.uid);
        this.loadUserData();
      } else {
        console.log('User not logged in.');
        // Handle case where user is not logged in, e.g., redirect to login page
        this.router.navigate(['/login']);
      }
    });
  }
  getBonus(): number {
    return this.pass.balance ? this.pass.balance / 5 : 0;
  }

  getTotal(): number {
    return this.pass.balance ? this.pass.balance + this.getBonus() : 0;
  }

  loadUserData() {
    if (this.uid) {
      this.serv.getUserByUid(this.uid).subscribe(users => {
        console.log('Fetched users:', users);
        if (users.length > 0) {
          const user = users[0].passengerNames;
          const [name, surname] = user.split(' ');
          this.pass = users[0];
          this.serv.setData(this.pass);
          if (surname) {
            this.name = `${name.charAt(0).toUpperCase()}.${surname}`;
          } else {
            this.name = `${name.toUpperCase()}.`;
          }
        } else {
          console.log('User not found');
          alert('User not found!!');
        }
      });
    }
  }

  navigateTo() {
    if (this.uid) {
      this.router.navigate(['/taxi'], { queryParams: { uid: this.uid } });
    } else {
      console.log('No UID available');
    }
  }

  search() {
    // Implement search functionality if needed
  }
}
