import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/service/vehicle';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-vehicle-profile',
  templateUrl: './vehicle-profile.page.html',
  styleUrls: ['./vehicle-profile.page.scss'],
})
export class VehicleProfilePage implements OnInit {
name:string="";
  vehicle: Vehicle = {
    vehicleId: 'hbsdhjsdsdggsg', 
    ownerName: 'Nduduzo Gatsheni',
    email: 'ndudzo@gmail.com', 
    transportType: 'Bus', 
    transportNumber: '123123', 
    password: 'bdvcvddhf' 
  };
  vehicleProfilePicture: string = './assets/both.png';

  constructor(private serv:ServiceService) { }

  ngOnInit() {
    this.vehicle = this.serv.getVehicleData();
    this.name = this.vehicle.transportType;
  }

}
