import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseError } from 'firebase/app';
import { Router } from '@angular/router';
import { ServiceService } from './service.service';
import { passenger } from '../service/passenger';
import { Vehicle } from '../service/vehicle';
import { take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'firebase/auth'

// import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'; // Importing the compat version of Firebase

interface LoginData {
  loginCount: number;
  logins: string[];
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  current_User:string="";
  email: string="";
  uid!:any;
  vehicle: Vehicle | undefined;
  private currentUser: User | null = null;
  private userUid: string | null = null;
  private user$: Observable<User | null>; 

  constructor(private afAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private alertController: AlertController,
              public loadingController: LoadingController,
              private router: Router,
              private toastController: ToastController
       ) {
        this.user$ = this.afAuth.authState as Observable<User | null>;
                }
              
                getCurrentUser(): Observable<User | null> {
                  return this.user$;
                }
    
                getUserUid(): Observable<string | null> {
                  return this.user$.pipe(
                    map((user: User | null) => user ? user.uid : null)
                  );
                }
              
              
              


getCurrentUserUID(): Promise<string | null> {
return new Promise<string | null>((resolve, reject) => {
  this.afAuth.authState.subscribe((user) => {
    if (user) {
      resolve(user.uid);
    } else {
      resolve(null); // No user is signed in
    }
  }, error => {
    reject(error);
  });
});
}

async presentLoader() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      translucent: true,
      spinner: 'circles', 
      duration: 800 
    });
    await loading.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color, 
      duration: 2000, 
      position: 'top',
    });
    toast.present();
  }

async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  getTransport(uid: string): Observable<Vehicle[]> {
    return this.firestore.collection<Vehicle>('vehicles', ref => ref.where('transportNumber', '==', uid)).valueChanges();
  }

  async login(email: string, password: string): Promise<void> {
    
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      if (emailRegex.test(email)) {
     
        this.presentLoader();
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = credential.user;
    
      if (user && !user.emailVerified) {
        this.presentToast('Please verify your email before logging in.', 'warning');
        await this.afAuth.signOut();
        return;
      }
      if (user && credential.user) {
        const uid = credential.user.uid;
        this.email = email;
        this.uid = uid;
        // alert(uid);
        this.logUserLogin(uid);
        this.router.navigate(['/tabs/home'], { queryParams: { uid: uid} });
        return;
      }
     else {
        // this.presentAlert('Error', 'The User not found.');
        return;
      }
    }
    if (!emailRegex.test(email)) {
      //  ----------------------------------------------------------------------
      this.getTransport(email).pipe(
        take(1), // Take only the first emitted value
        switchMap((vehicles: Vehicle[]) => {
          if (vehicles.length > 0) {
            this.vehicle = vehicles[0];
            return this.afAuth.signInWithEmailAndPassword(this.vehicle.email, password);
          } else {
            return of(null); // Emit a null value if no vehicles are found
          }
        })
      ).subscribe({
        next: async (userCredential) => {
          if (userCredential && userCredential.user) {
            const uid = userCredential.user.uid;
            this.uid = uid;
            this.email = email;
            await this.presentToast('Login in successfully.','success');
           this.logUserLogin(uid);
            this.router.navigate(['/driver-tabs/dashboard'], { queryParams: { uid: uid } });
          } else {
            await this.presentToast('User not found.','danger');
          }
        },
        error: async (error) => {
          console.error('Error signing in:', error.message);
          await this.presentToast('An error occurred while signing in.','danger');
        }
      });
    }
    }
    catch (error) {
      console.error('Error logging in:', error);
      if (error instanceof FirebaseError && error.code === 'auth/user-not-found') {
        this.presentToast('The email address is not associated with any account.','danger');
      } else if (error instanceof FirebaseError && error.code === 'auth/wrong-password') {
        this.presentToast('Password is incorrect.','danger');
      } else {
        this.presentToast('An error occurred while logging in. Please try again later.','danger');
      }
    }
  }










  async logUserLogin(uid: string): Promise<void> {
    try {
      // Ensure uid is provided
      if (!uid) {
        console.error('User ID is missing');
        return;
      }

      const userDocRef = this.firestore.collection('historyLogins').doc(uid); // Reference to user's document
      const userDocSnap = await userDocRef.get().toPromise(); // Fetch the document

      const loginTime = new Date().toISOString(); // Current timestamp

      if (userDocSnap && userDocSnap.exists) {
        // If the document exists, increment the loginCount and add the new time to the array
        const currentData = userDocSnap.data() as LoginData; // Type assertion for currentData
        const currentCount = currentData?.loginCount || 0; // Access loginCount safely

        await userDocRef.update({
          loginCount: currentCount + 1, // Increment login count
          logins: firebase.firestore.FieldValue.arrayUnion(loginTime) // Use arrayUnion from Firebase
        });
        console.log(`Login count updated for user: ${uid}, Time: ${loginTime}`);
      } else {
        // If the document does not exist, create it with an initial login count and array of logins
        await userDocRef.set({
          loginCount: 1,
          logins: [loginTime] // First login time in the array
        });
        console.log(`Login count initialized for user: ${uid}, Time: ${loginTime}`);
      }
    } catch (error) {
      console.error('Error logging user login:', error);
      // Additional error handling can be added here, e.g., displaying an alert to the user
    }
  }
}

