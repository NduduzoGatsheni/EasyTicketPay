import { Component, OnInit } from '@angular/core';
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

  passenger: passenger = {
    passengerId: '',
    passengerNames: '',
    passengerEmail: '',
    passengerPassword: ''
  };
  confirmPassword: string = '';

  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private serv: ServiceService) { }

  ngOnInit() { }

  async signup() {
    if (!this.validateInputs()) return;

    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(this.passenger.passengerEmail, this.passenger.passengerPassword);
      const user = credential.user;
    
      
      if (user) {
        await user.sendEmailVerification();
       

        await this.serv.signUp(this.passenger, user.uid);
        this.authService.presentToast('Signup process initiated. Please check your email to verify your account.', 'success');
        this.clearFields();
        await this.afAuth.signOut();
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.authService.presentToast("Email is already registered. Please use a different email.", "danger");
      } else {
        this.authService.presentToast("Error during signup", "danger");
      }
    }
  }

  validateInputs(): boolean {
    if (!this.passenger.passengerNames.trim() || !this.passenger.passengerEmail.trim() ||
        !this.passenger.passengerPassword.trim() || !this.confirmPassword.trim()) {
      this.authService.presentToast('All fields are required', 'warning');
      return false;
    }
    if (!this.validateFullName(this.passenger.passengerNames)) {
      this.authService.presentToast('Full name must contain at least two names and should not include numbers', 'warning');
      return false;
    }
    if (!this.validateEmail(this.passenger.passengerEmail)) {
      this.authService.presentToast('Invalid email format', 'warning');
      return false;
    }
    if (!this.validatePassword(this.passenger.passengerPassword)) {
      this.authService.presentToast('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character', 'warning');
      return false;
    }
    if (this.passenger.passengerPassword !== this.confirmPassword) {
      this.authService.presentToast('Passwords do not match', 'warning');
      return false;
    }
    return true;
  }
  
  validateFullName(fullName: string): boolean {
    const namePattern = /^[A-Za-z]+\s[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    return namePattern.test(fullName);
  }
  
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }

  clearFields() {
    this.passenger.passengerNames = '';
    this.passenger.passengerEmail = '';
    this.passenger.passengerPassword = '';
    this.confirmPassword = '';
  }
}
