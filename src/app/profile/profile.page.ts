import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { ServiceService } from '../shared/service.service';
import { passenger } from '../service/passenger';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { User } from 'firebase/auth';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  qrCodeValue: string = 'Initial QR Code Value';
  userData: string = 'I am Nduduzo Ndlovu';
  email:string = "";
  amount!:string;
  name:string='';
  uid!:string;
  user: User | null = null; 
  passenger: passenger;
  constructor(private serv:ServiceService,private authService: AuthService,private router: Router) {
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

  generateQrCode() {
  
    this.qrCodeValue = this.passenger.passengerId;
  }

}
