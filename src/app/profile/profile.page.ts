import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }
  openMenu() {
    this.menuController.enable(true, 'main-content'); // Make sure to replace 'menuId' with the actual menu ID
    this.menuController.open('main-content');
  }
  // openMenu() {
  //   this.menu.toggle('menuId');
  // }
}
