import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { ServiceService } from '../shared/service.service';
import { passenger } from '../service/passenger';

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
  passenger: passenger;
  constructor(private serv:ServiceService) {
    this.passenger = {
      passengerId: '9qdkqV52b1cqkRgDwnTmBYkCtOC2',
      passengerNames: 'Fezeka',
      passengerEmail: 'fezi@gmail.com',
      passengerPassword: '09988776'  
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
