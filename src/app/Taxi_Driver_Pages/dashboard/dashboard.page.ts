import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/service.service';
import { AuthService } from 'src/app/shared/auth.service';
import { passenger } from 'src/app/service/passenger';
import { Vehicle } from 'src/app/service/vehicle';
import firebase from 'firebase/compat/app';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  uid:string="1ZXjgirev8beBEZh2GZSsLVDRgQ2";
  name = "";
  user!:any;
  vehicle:Vehicle;
  queryParamsSubscription: Subscription | undefined;
  constructor(private authService: AuthService,private serv:ServiceService,private route: ActivatedRoute,private navCtrl: NavController) { 

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
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const  data= params['uid'];
      if(data){
        this.uid = data;
      }
      });
      this.serv.getTransport(this.uid).subscribe(users => {
        if (users.length > 0) {
          const user = users[0].ownerName;
          const [name, surname] = user.split(' ');
      
          this.vehicle = users[0];
          this.serv.setVehicleData(this.vehicle);
      
          if (surname) {
              this.name = `${name.charAt(0).toUpperCase()}.${surname}`;
          } else {
              this.name = `${name.toUpperCase()}.`;
          }
      
          alert("Name: " + this.name);
      } else {
          console.log('User not found');
          alert('User not found!!');
      }      
      });
  }

  goToHistory() {
   
    this.navCtrl.navigateForward(['//driver-tabs/cliam-history'], {
      queryParams: { uid: this.uid }
    });
  }
}
