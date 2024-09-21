import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { passenger } from '../service/passenger';
import { AuthService } from '../shared/auth.service';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  qrCodeValue: string = 'Initial QR Code Value';
  name: string = '';
  uid: string = '';
  user: User | null = null;
  passenger: passenger | null = null;
  private userSubscription: Subscription | undefined;
  private passengerSubscription: Subscription | undefined;

  constructor(
    private serv: ServiceService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.uid = user.uid;
        this.loadPassengerData();
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.passengerSubscription) {
      this.passengerSubscription.unsubscribe();
    }
  }

  loadPassengerData() {
    this.passengerSubscription = this.serv.getByUid(this.uid).subscribe(
      passengers => {
        if (passengers && passengers.length > 0) {
          this.passenger = passengers[0];
          this.name = this.passenger.passengerNames;
          this.generateQrCode();
        } else {
          console.log('No passenger data found');
        }
      },
      error => {
        console.error('Error fetching passenger data:', error);
      }
    );
  }

  generateQrCode() {
    if (this.passenger) {
      this.qrCodeValue = this.passenger.passengerId;
    }
  }
}