import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { AuthService } from '../shared/auth.service';
import { passenger } from '../service/passenger';
import firebase from 'firebase/compat/app';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  uid:string="9qdkqV52b1cqkRgDwnTmBYkCtOC2";
  name = "";
  user!:any;
  balance = 100;
  totalTrips = 5;
  
  currentUser: any | null;
  passenger:string ="";

  pass: passenger = {
    passengerId: '',
    passengerNames: '',
    passengerEmail: '',
    passengerPassword: ''
  };
  queryParamsSubscription: Subscription | undefined;
  constructor(private authService: AuthService,private serv:ServiceService,private route: ActivatedRoute, private router: Router) {
   }

   ngOnInit(): void {

    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
    
    const  data= params['uid'];
    if(data){
      this.uid = data;
    }
    });

    this.serv.getUserByUid(this.uid).subscribe(users => {
      if (users.length > 0) {
        const user = users[0].passengerNames;
        const [name, surname] = user.split(' ');
        this.pass = users[0];
        this.serv.setData(this.pass);
        // this.name = `${name.charAt(0).toUpperCase()}.${surname}`;
        if (surname) {
          this.name = `${name.charAt(0).toUpperCase()}.${surname}`;
      } else {
          this.name = `${name.toUpperCase()}.`;
      }

      } else {
        console.log('User not found');
        alert('User not found!!');
      }
    });
  }

  navigateTo(){
    this.router.navigate(['/taxi'], { queryParams: { uid: this.uid } });
  }

  search(){
  }
}
