// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tabs',
//   templateUrl: 'tabs.page.html',
//   styleUrls: ['tabs.page.scss']
// })
// export class TabsPage {

//   constructor() {}

// }




import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  userUid: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserUid().subscribe(uid => {
      this.userUid = uid;
      console.log('User UID:', this.userUid);
    });
  }
}
