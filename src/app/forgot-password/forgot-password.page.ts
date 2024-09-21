import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  username: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    const toolbarEl = document.querySelector('ion-toolbar');
    toolbarEl?.setAttribute('color', 'transparent');
  }

 

  async forgotPassword() {
    if (!this.username) {
      this.presentAlert('Error', 'Please enter your email address.');
      return;
    }
    try {
      await this.afAuth.sendPasswordResetEmail(this.username);
      this.presentAlert('Success', 'Password reset link has been sent to your email.');
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.presentAlert('Error', error.message);
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goBack() {
    // You can add any custom logic here
    this.navCtrl.back();
  }
}
