import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseError } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   
  email:string="";
  password:string="";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  // async login(){
  //   if(this.email && this.password){
  //     await this.authService.presentLoader();
  //     try {
  //       await this.authService.login(this.email, this.password);
  //       this.router.navigate(['/tabs/home']);
  //     } catch (error) {
  //       console.error('Error logging in:', error);
  //       if (error instanceof FirebaseError && error.code === 'auth/user-not-found') {
  //         this.authService.presentAlert('Error', 'The email address is not associated with any account.');
  //       } else if (error instanceof FirebaseError && error.code === 'auth/wrong-password') {
  //         this.authService.presentAlert('Error', 'The password is incorrect.');
  //       } else {
  //         this.authService.presentAlert('Error', 'An error occurred while logging in. Please try again later.');
  //       }
  //     } finally {
  //       // await this.authService.dismissLoader(); // Dismiss loader regardless of login success or failure
  //     }
  //   }
  //   else{
  //     this.authService.presentAlert("Error","Please enter email and password");
  //   }
  // }
  
  
  async login(){
    if(this.email && this.password){
      await this.authService.presentLoader();
      await this.authService.login(this.email, this.password)

        // this.router.navigate(['/tabs/home']);
     
    }
    else{
      this.authService.presentAlert("Error","Please enter email and password");
    }

  }

}
