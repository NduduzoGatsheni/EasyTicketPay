import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseError } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { passenger } from '../service/passenger';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  current_User:string="";
  email: string="";
  uid!:any;

  constructor(private afAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private alertController: AlertController,
              public loadingController: LoadingController,
              private router: Router) { }

getCurrentUser() {
                return this.afAuth.authState; // Returns an Observable<firebase.User | null>
              }

  async presentLoader() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      translucent: true,
      spinner: 'circles', 
      duration: 1000 
    });
    await loading.present();
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
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (userCredential && userCredential.user) {
        const uid = userCredential.user.uid;
        this.email = email;
        this.uid = uid;
        alert(uid);
        this.router.navigate(['/tabs/home'], { queryParams: { uid: uid } });
        // this.router.navigate(['/tabs/home',uid]);
      } else {
        this.presentAlert('Error', 'The User not found.');
      }
      
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

  // getUserData(): Observable<UserData | null> {
  //   return this.firestore.collection('passagers').doc(this.uid).snapshotChanges()
  //     .pipe(
  //       map(doc => {
  //         if (doc.payload.exists) {
  //           const data = doc.payload.data() as UserData; // Cast payload data to UserData interface
  //           return { id: doc.payload.id, ...data };
  //         } else {
  //           alert("Document does not exist");
  //           return null;
  //         }
  //       })
  //     );
  // }
  // async getUserData() {
   
  //   try {
  //     const userDoc = await this.firestore.collection('passagers').doc(this.uid).ref.get();
    
  //     if (userDoc.exists) {
  //       const userData = userDoc.data(); // Retrieve user data
     
  //       return userData; // Return an object with individual variables
  //     } else {
  //       alert(" Return null if the document does not exist");
  //       return null; // Return null if the document does not exist
       
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //     return null; // Return null or handle errors appropriately
  //   }
  // }
}
