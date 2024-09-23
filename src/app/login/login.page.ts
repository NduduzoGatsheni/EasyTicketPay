import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   
  email:string="";
  password:string="";
  signupType:string="";
  selectedDashboard: string ='';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    
  }
  navigateToDashboard() {
    if (this.selectedDashboard === 'passenger') {
      this.router.navigate(['/signup']);
    } else if (this.selectedDashboard === 'vehicle') {
      this.router.navigate(['/driver-tabs/signup']);
    }
  }
  async login(){
    if(this.email && this.password){
      await this.authService.presentLoader();
      await this.authService.login(this.email, this.password)
    }
    else{
      this.authService.presentToast("Please enter email and password","danger");
    }

  }
clear(){
  this.email="";
  this.password="";
}
}
