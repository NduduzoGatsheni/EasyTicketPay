import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  passenger = {
    passangerNames: '',
    passangerEmail: '',
    passangerPassword: ''
  };
  confirmPassword: string = '';

  constructor( private authService: AuthService) {}
  ngOnInit() {}

  // Signup function

  signup() {
    // Perform validation checks
    if (this.passenger.passangerNames && this.passenger.passangerEmail && this.passenger.passangerPassword && this.confirmPassword) {
      if (this.passenger.passangerPassword !== this.confirmPassword) {
        // Passwords do not match
        console.log('Passwords do not match');
        return;
      }

      this.authService.signUp(this.passenger.passangerNames, this.passenger.passangerEmail, this.passenger.passangerPassword);
      // All fields are filled and passwords match, you can perform signup process here
      console.log('Signup process initiated');
      
      // Optionally, you can clear the fields after successful signup
      this.clearFields();
    } else {
      // Some fields are missing
      console.log('Please fill in all fields');
    }
  }

  clearFields() {
    this.passenger.passangerNames = '';
    this.passenger.passangerEmail = '';
    this.passenger.passangerPassword = '';
    this.confirmPassword = '';
  }
}