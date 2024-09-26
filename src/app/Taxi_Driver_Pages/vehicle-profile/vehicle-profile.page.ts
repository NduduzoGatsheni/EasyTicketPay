import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/service/vehicle';
import { ServiceService } from 'src/app/shared/service.service';
// import { Component, OnInit } from '@angular/core';
// import { ServiceService } from 'src/app/shared/service.service';
import { AuthService } from 'src/app/shared/auth.service';
import { passenger } from 'src/app/service/passenger';
// import { Vehicle } from 'src/app/service/vehicle';
import firebase from 'firebase/compat/app';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-vehicle-profile',
  templateUrl: './vehicle-profile.page.html',
  styleUrls: ['./vehicle-profile.page.scss'],
})
export class VehicleProfilePage implements OnInit {
name:any;
uid: string='';
user:any;

vehicle: Vehicle | undefined;
  vehicleProfilePicture: string = './assets/both.png';

  constructor(private serv:ServiceService,
    private authService: AuthService,private route: ActivatedRoute,private navCtrl: NavController
  ) { }

  ngOnInit() {


    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.uid = user.uid;
        console.log('Current User UID:', this.uid);

        this.serv.getVehicleById(this.uid).subscribe(data => {
          this.vehicle = data;
          this.name = this.vehicle?.transportType;
        });
    // this.vehicle = this.serv.getTransport(this.uid);
  
  }
    
  });
}

}
