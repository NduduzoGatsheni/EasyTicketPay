import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { AuthService } from '../shared/auth.service';
import { passenger } from '../service/passenger';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.page.html',
  styleUrls: ['./personal-card.page.scss'],
})
export class PersonalCardPage implements OnInit {
  uid: string | null = null;
  // name: string = '';
  user: User | null = null; 
  balance = 100;
  totalTrips = 5;

  currentUser: any | null = null;
  passenger: string = '';

  pass: passenger = {
    passengerId: '',
    passengerNames: '',
    passengerEmail: '',
    passengerPassword: ''
  };

 

  @Input() name: string = 'NDUDUZO NDLOVU';
  @Input() title: string = 'EasyPayTicket';
  @Input() email: string = 'nduduzondlovu635@gmail.com';
  @Input() phone: string = '074 0998713';
  @Input() address: string = '24 mut road';
  @Input() qrCodeData: string = 'qr code data...';



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

  loadUserData() {
    if (this.uid) {
      this.serv.getUserByUid(this.uid).subscribe(users => {
        console.log('Fetched users:', users);
        if (users.length > 0) {
          this.pass = users[0];
          this.name = this.pass.passengerNames;
          // @Input() title: string = 'EasyPayTicket';
          this.email = this.pass.passengerEmail;
          this.phone = '074 0998713';
          this.address  = '24 mut road';
          this.qrCodeData = this.pass.passengerId;
  
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


printCard() {
  window.print();
}
createTemporalCard() {
  // This is a placeholder function for creating a temporal card
  // You would implement the actual functionality here
  alert("Creating a temporal card... This feature is not yet implemented.");
  
  // Example of what this function might do:
  // 1. Generate a unique identifier for the temporal card
  // 2. Create a copy of the current card data with an expiration date
  // 3. Store this data (e.g., in localStorage or send to a server)
  // 4. Generate a shareable link for the temporal card
  // 5. Display the link to the user
}
}

