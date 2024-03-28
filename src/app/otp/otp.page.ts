import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OTPPage implements OnInit {
  otpDigit1: string = '';
  otpDigit2: string = '';
  otpDigit3: string = '';
  otpDigit4: string = '';
  otpDigit5: string = '';
  otpDigit6: string = '';

  constructor() {}

  verifyOTP() {
    const otp = this.otpDigit1 + this.otpDigit2 + this.otpDigit3 + this.otpDigit4 + this.otpDigit5 + this.otpDigit6;
    
    // Here you can implement your OTP verification logic.
    // For demonstration purposes, let's just log the OTP.
    console.log('Entered OTP:', otp);
  }
  ngOnInit() {
  }

}
