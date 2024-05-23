import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../shared/auth.service';
import { ServiceService } from '../shared/service.service';
import { passenger } from '../service/passenger';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  passenger:passenger={
    passengerId: '',
    passengerNames: '',
    passengerEmail: '',
    passengerPassword: ''
  }
  confirmPassword: string = '';

  constructor( private authService: AuthService,private afAuth: AngularFireAuth,private serv:ServiceService) {}

  ngOnInit() {}


  async signup() {
    if (this.passenger.passengerNames && this.passenger.passengerEmail && this.passenger.passengerPassword && this.confirmPassword) {
      if (this.passenger.passengerPassword !== this.confirmPassword) {
        console.log('Passwords do not match');
        return;
      }
       const credential = await this.afAuth.createUserWithEmailAndPassword(this.passenger.passengerEmail, this.passenger.passengerPassword);
       const user = credential.user;
      if (user) {
        this.serv.signUp(this.passenger,user.uid);
        console.log('Signup process initiated');
        this.clearFields();  }
    } else {
      // Some fields are missing
      console.log('Please fill in all fields');
    }
  }

  clearFields() {
    this.passenger.passengerNames = '';
    this.passenger.passengerEmail = '';
    this.passenger.passengerPassword = '';
    this.confirmPassword = '';
  }
}