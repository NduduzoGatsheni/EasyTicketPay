import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { FirebaseError } from 'firebase/app';
// import { AlertController } from '@ionic/angular';
// import { LoadingController } from '@ionic/angular';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   
  email:string="";
  password:string="";
  signupType:string="";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  
  async login(){
    if(this.email && this.password){
      await this.authService.presentLoader();
      await this.authService.login(this.email, this.password)
    }
    else{
      this.authService.presentAlert("Error","Please enter email and password");
    }

  }

}
