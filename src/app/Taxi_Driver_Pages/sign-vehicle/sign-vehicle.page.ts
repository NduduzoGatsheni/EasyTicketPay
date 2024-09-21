import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServiceService } from 'src/app/shared/service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

interface Vehicle {
  vehicleId:string;
  ownerName: string;
  email: string;
  transportType: string;
  transportNumber: string;
  password: string;
}

@Component({
  selector: 'app-sign-vehicle',
  templateUrl: './sign-vehicle.page.html',
  styleUrls: ['./sign-vehicle.page.scss'],
})
export class SignVehiclePage implements OnInit {

  confirmPassword: string = '';
  vehicle: Vehicle = {
    vehicleId:'',
    ownerName: '',
    email: '',
    transportType: '',
    transportNumber: '',
    password: ''
  };

  constructor(private navCtrl: NavController, private afAuth: AngularFireAuth, private serv: ServiceService) { }

  ngOnInit(): void {}

  async signUp() {
    if (!this.vehicle.ownerName || !this.vehicle.email || !this.vehicle.transportType || !this.vehicle.transportNumber || !this.vehicle.password) {
      console.log("Please fill in all fields");
      return;
    }

    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(this.vehicle.email, this.vehicle.password);
      const user = credential.user;

      if (user) {
        this.serv.signUpVehicle(this.vehicle, user.uid);
        console.log('Signup process initiated');
        this.clear();
      } else {
        console.log('User registration failed');
      }
    } catch (error:any) {
      console.error('Error registering user:', error.message);
    }
  }

  clear() {
    this.vehicle = {
      vehicleId:'',
      ownerName: '',
      email: '',
      transportType: '',
      transportNumber: '',
      password: ''
    };
    this.confirmPassword = '';
  }
}
