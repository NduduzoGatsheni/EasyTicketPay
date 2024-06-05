import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/service/vehicle';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQRPage implements OnInit {
  uid:string="9qdkqV52b1cqkRgDwnTmBYkCtOC2";
  name = "";
  user!:any;
  vehicle:Vehicle;
  constructor(private serv:ServiceService) {
    this.vehicle = {
      vehicleId:'',
      ownerName: '',
      email: '',
      transportType: '',
      transportNumber: '',
      password: ''
    }
   }

  ngOnInit() {
    this.vehicle = this.serv.getVehicleData();
    this.name = this.vehicle.transportType;
  }

}
