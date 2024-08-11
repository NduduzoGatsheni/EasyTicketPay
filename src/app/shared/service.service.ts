import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { passenger } from '../service/passenger';
import { Transaction } from '../service/Transactions';
import { Vehicle } from '../service/vehicle';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

// interface Vehicle {
//   vehicleId:string;
//   ownerName: string;
//   email: string;
//   transportType: string;
//   transportNumber: string;
//   password: string;
// }

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private uid!:string;
  private passenger: passenger;
  private vehicle: Vehicle;

  constructor(private afAuth: AngularFireAuth,private firestore: AngularFirestore,private authService: AuthService) 
  { 
    this.passenger = {
      passengerId: '',
      passengerNames: '',
      passengerEmail: '',
      passengerPassword: ''
    };
    this.vehicle={
      vehicleId:'',
      ownerName: '',
      email: '',
      transportType: '',
      transportNumber: '',
      password: ''
    }
  }

  setUID(uid: string) {
    this.uid=uid;
  }
  getUID(): string {
    return this.uid;
  }
  setData(passenger: passenger) {
    this.passenger = passenger;
  }
  setVehicleData(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }
  getData(): passenger {
    return this.passenger;
  }
  getVehicleData(): Vehicle {
    return this.vehicle;
  }
  getUserByUid(uid: string): Observable<passenger[]> {
    return this.firestore.collection<passenger>('passengers', ref => ref.where('passengerId', '==', uid)).valueChanges();
  }
  updatePassenger(passengerId: string, updatedPassenger: any): Promise<void> {
    return this.firestore.collection('passengers').doc(passengerId).update(updatedPassenger);
  }
  getPassengerById(passengerId: string): Observable<passenger | undefined> {
    return this.firestore.collection('passengers').doc<passenger>(passengerId).valueChanges();
  }

  getTransport(uid: string): Observable<Vehicle[]> {
    return this.firestore.collection<Vehicle>('vehicles', ref => ref.where('vehicleId', '==', uid)).valueChanges();
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
        this.authService.presentAlert('Successfully',"Passenger signed up successfully")
      
    } catch (error:any) {
      if (error.code === 'auth/email-already-in-use') {
        this.authService.presentAlert('Error', 'The email address is already in use by another account. Please use a different email.');
      } else {
        this.authService.presentAlert('Error', 'Error signing up');
      }
    }
  }

  async signUpVehicle(vehicle: Vehicle, uid: string): Promise<void> {
    try {
      vehicle.vehicleId = uid;
      await this.firestore.collection('vehicles').doc(vehicle.vehicleId).set({
        ownerName: vehicle.ownerName,
        email: vehicle.email,
        transportType: vehicle.transportType,
        transportNumber: vehicle.transportNumber,
        password: vehicle.password,
        vehicleId: vehicle.vehicleId,
      });
  
      console.log('Vehicle signed up successfully:', vehicle.vehicleId);
      this.authService.presentAlert('successfully',"Vehicle signed up successfully");
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.authService.presentAlert('Error', 'The email address is already in use by another account. Please use a different email.');
      } else {
        this.authService.presentAlert('Error', 'Error signing up: ' + error.message);
      }
    }
  }
  async addTransaction(transaction: Transaction): Promise<void> {
    const transactionRef = this.firestore.collection('transactions').doc().ref;
    transaction.TransactionID = transactionRef.id;

    await transactionRef.set({
      TransactionID: transaction.TransactionID,
      VehicleId: transaction.VehicleId,
      passengerId: transaction.passengerId,
      From_To: transaction.From_To,
      Amount: transaction.Amount,
      dateTime: transaction.dateTime
    });
  }

  // getTransactions(): Observable<any> {
  //   return this.firestore.collection("transactions").valueChanges();
  // }
  getTransactions(): Observable<any[]> {
    return this.firestore.collection('transactions').snapshotChanges();
  }

  getTransactionsById(v_Id: string): Observable<any[]> {
    return this.firestore.collection('transactions', ref => ref.where('VehicleId', '==', v_Id)).snapshotChanges();
  }
}
