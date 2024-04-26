import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   
  email:string="";
  password:string="";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }


  
  async login(){
    if(this.email && this.password){
      await this.authService.presentLoader();
      this.authService.login(this.email,this.password)
      .then(() => {
        this.router.navigate(['/tabs/home']);
      })
    }
    else{
      this.authService.presentAlert("Error","Please enter email and password");
    }

  }

}
