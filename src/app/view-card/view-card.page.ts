// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.page.html',
  styleUrls: ['./view-card.page.scss'],
})
export class ViewCardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input() name: string = 'NDUDUZO NDLOVU';
  @Input() title: string = 'EasyPayTicket';
  @Input() email: string = 'nduduzondlovu635@gmail.com';
  @Input() phone: string = '074 0998713';
  @Input() address: string = '24 mut road';
  @Input() qrCodeData: string = 'qr code data...';
}
