import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from 'src/app/service/vehicle';
import { ServiceService } from 'src/app/shared/service.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

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

    
  @ViewChild('scannerPreview', { static: false })
  scannerPreview!: ElementRef;
  scanResult: string = '';

  passengers = [
    { name: 'John Doe' },
    { name: 'Jane Smith' },
    { name: 'John Doe' },
    { name: 'Jane Smith' },
    { name: 'John Doe' },
    { name: 'Jane Smith' }
  ];

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
  removePassenger(passenger:any) {
    this.passengers = this.passengers.filter(p => p !== passenger);
  }

  async startScan() {
    // Ensure the scanner has permission
    const permission = await BarcodeScanner.checkPermission({ force: true });
    if (!permission.granted) {
      // Handle permission denied case
      this.scanResult = 'Camera permission is not granted';
      return;
    }

    BarcodeScanner.hideBackground(); // Make the background of WebView transparent
    const result = await BarcodeScanner.startScan(); // Start scanning and wait for a result

    if (result.hasContent) {
      this.scanResult = result.content; // Process the scan result
    } else {
      this.scanResult = 'No content found';
    }

    BarcodeScanner.showBackground(); // Make the background of WebView visible again
  }

  stopScan() {
    BarcodeScanner.stopScan();
    BarcodeScanner.showBackground(); // Make the background of WebView visible again
  }
}
