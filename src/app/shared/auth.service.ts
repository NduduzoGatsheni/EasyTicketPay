// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseError } from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore,private alertController: AlertController) { }

  async signUp(full_name: string, email: string, password: string ): Promise<void> {
    try {
      const credential = await this.afAuth['createUserWithEmailAndPassword'](email, password);
      const user = credential.user;
      if (user) {
        await this.firestore.collection('passengers').doc(user.uid).set({
          full_name: full_name,
          uid:user.uid,
          email: email,
          password: password
        });
      } else {
        throw new Error('User is null');
      }
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
        this.presentAlert('Error', 'The email address is already in use by another account. Please use a different email.');
    } else {
        this.presentAlert('Error', 'Error signing up:');
      }
     
    }
  }



  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


 async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth['signInWithEmailAndPassword'](email, password);
      // If login successful, you can navigate the user to another page or perform other actions
    } catch (error) {
      console.error('Error logging in:', error);

      if (error instanceof FirebaseError && error.code === 'auth/user-not-found') {
        this.presentAlert('Error', 'The email address is not associated with any account.');
      } else if (error instanceof FirebaseError && error.code === 'auth/wrong-password') {
        this.presentAlert('Error', 'The password is incorrect.');
      } else {
        this.presentAlert('Error', 'An error occurred while logging in. Please try again later.');
      }
    }
  }


}
