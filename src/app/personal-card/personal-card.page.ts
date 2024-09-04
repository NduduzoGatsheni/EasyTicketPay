import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.page.html',
  styleUrls: ['./personal-card.page.scss'],
})
export class PersonalCardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() name: string = 'NDUDUZO NDLOVU';
  @Input() title: string = 'MR';
  @Input() email: string = 'nduduzondlovu635@gmail.com';
  @Input() phone: string = '074 0998713';
  @Input() address: string = '24 mut road';
  @Input() qrCodeData: string = 'qr code data...';
}


// personal-card.component.scss
