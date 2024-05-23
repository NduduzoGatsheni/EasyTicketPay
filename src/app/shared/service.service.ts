import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { passenger } from '../service/passenger';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  constructor(private afAuth: AngularFireAuth,private firestore: AngularFirestore,private authService: AuthService) { }

  getUserByUid(uid: string): Observable<passenger[]> {
    return this.firestore.collection<passenger>('passengers', ref => ref.where('passengerId', '==', uid)).valueChanges();
  }

  async signUp(passenger:passenger, uid:string ): Promise<void> {
    try {
     
        passenger.passengerId = uid;
        
        await this.firestore.collection('passengers').doc(passenger.passengerId).set({
          passengerNames: passenger.passengerNames,
          passengerEmail: passenger.passengerEmail,
          passengerPassword: passenger.passengerPassword, 
          passengerId: passenger.passengerId,
        });

        console.log('Passenger signed up successfully:', passenger.passengerId);
      
    } catch (error:any) {
      if (error.code === 'auth/email-already-in-use') {
        this.presentAlert('Error', 'The email address is already in use by another account. Please use a different email.');
      } else {
        this.presentAlert('Error', 'Error signing up: ' + error.message);
      }
    }
  }
  presentAlert(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
}
