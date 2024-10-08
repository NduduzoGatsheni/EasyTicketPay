import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from 'src/app/service/vehicle';
import { passenger } from 'src/app/service/passenger';
import { Transaction } from 'src/app/service/Transactions';
import { ServiceService } from 'src/app/shared/service.service';
import { AuthService } from 'src/app/shared/auth.service';
  import { Plugins } from '@capacitor/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
interface Route {
  from: string;
  to: string;
  amount: number;
}
// import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
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

  money:number=20;
  passenger: passenger;
    
  @ViewChild('scannerPreview', { static: false })
  scannerPreview!: ElementRef;
  scanResult: string = '';

passengers: Array<{ name: string; money_in: number }> = []; 
payingPassenger: {name: string, money_in: number };

place:string="";
price:number=0;
locations: { location: string; amount: number }[] = [];
// locations =[{location:"Durban - South Beach",amount:10},
//             {location:"Durban - Umlazi",amount:20},
//             {location:"Durban - Kwashu",amount:25},
//             {location:"Durban - Mont_Clair",amount:18},
//             {location:"Durban - Mayville",amount:18},
//             {location:"Durban - Musgrave",amount:10},
//             {location:"Durban - Pagate",amount:30},
//             {location:"Durban - Velurem",amount:34},
//             {location:"Durban - Lovu",amount:28},
//             {location:"Durban - Umkhomazi",amount:40},
//             {location:"Durban - clair_mont",amount:40},
//             {location:"Durban - clair_estate",amount:25},
//             {location:"Durban - New German",amount:18},
//             {location:"Durban - Pine Town",amount:24},
//             {location:"Durban - Stanger",amount:60},
//             {location:"Durban - Ballito",amount:40},
//             {location:"Durban - Nanda",amount:34},
//             {location:"Durban - Mdloti",amount:28},
//             {location:"Durban - Efolweni",amount:55}
//             ]

transaction: Transaction = {
  TransactionID: '',
  VehicleId: '',
  passengerId: '',
  From_To: '', 
  Amount: 0,
  dateTime: ''
};
currentTime!: string;

  constructor(private serv:ServiceService,
    private firestore: AngularFirestore,
  private auth: AuthService,
) {

    this.vehicle = {
      vehicleId:'',
      ownerName: '',
      email: '',
      transportType: '',
      transportNumber: '',
      password: ''
    }

    this.passenger={
      passengerId:'',
      passengerNames:'',
      passengerEmail:'',
      passengerPassword:'',
   }
 
  this.payingPassenger={name:"",money_in: 0};

   }

  ngOnInit() {
    this.vehicle = this.serv.getVehicleData();

    this.name = this.vehicle.transportType;

    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);

    this.fetchRoutes();
  }
  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  onLocationChange(event: any) {
    const selectedLoc = this.locations.find(loc => loc.location === this.place);
    if (selectedLoc) {
      this.price = selectedLoc.amount;
    }
  }

  addTransaction() {
    this.serv.addTransaction(this.transaction)
      .then(() => {
        console.log('Transaction added successfully');
        this.auth.presentAlert("Transaction Added", "The transaction was added successfully.");

        this.transaction = {
          TransactionID: '',
          VehicleId: '',
          passengerId: '',
          From_To: '',
          Amount: 0,
          dateTime: ''
        };
      })
      .catch(error => console.error('Error adding transaction: ', error)  );
  }

  removePassenger(passenger:any) {
    this.passengers = this.passengers.filter(p => p !== passenger);
  }

async startScan() {
  try {
    console.log('Starting scan process...');
    return this.proceedWithScan();
  } catch (error) {
    console.error('Error in startScan:', error);
    this.scanResult = 'An error occurred while trying to scan.';
    this.auth.presentAlert("Error", this.scanResult);
  }
}

async proceedWithScan() {
  try {
    console.log('Preparing to start scan...');
    await BarcodeScanner.hideBackground();
    
    // Configure scanner
    await BarcodeScanner.prepare({
      targetedFormats: ['QR_CODE', 'EAN_13', 'EAN_8', 'CODE_128'] // Add or remove formats as needed
    });

    console.log('Starting scan with back camera...');
    const result = await BarcodeScanner.startScan();
    console.log('Scan result:', result);
    
    if (result.hasContent) {
      this.scanResult = result.content;
      this.subtractBalance(this.scanResult);
    } else {
      this.scanResult = 'No content found';
      this.auth.presentAlert("Error", "No content found");
    }
  } catch (error) {
    console.error('Error during scan:', error);
    this.scanResult = 'An error occurred during the scan.';
    this.auth.presentAlert("Scan Error", this.scanResult);
  } finally {
    console.log('Showing background...');
    await BarcodeScanner.showBackground();
    await BarcodeScanner.stopScan();
  }
}


  async subtractBalance(uid: string): Promise<string> {
    const passengerRef = this.firestore.collection('passengers').doc<passenger>(uid);
    const doc = await passengerRef.get().toPromise();

    if (!doc?.exists) {
   
      this.auth.presentAlert("Error", "Passenger not found");
      return 'Passenger not found';
    }

    const passenger = doc.data();
    this.passenger = passenger as passenger

    alert(this.passenger?.passengerNames);//shows the name of a passenger

    if (!passenger || typeof passenger.balance !== 'number') {
     
      this.auth.presentAlert("Error", "Invalid passenger data");
      return 'Invalid passenger data';
    }

    if (passenger.balance < this.price) {
    
      this.auth.presentAlert("Error", 'Insufficient balance');
      return 'Insufficient balance';
    }

    const newBalance = passenger.balance - this.price;
    await passengerRef.update({ balance: newBalance });

//load a temporal array
alert(this.price);
this.payingPassenger.name = this.passenger?.passengerNames;
this.payingPassenger.money_in = this.price;
this.passengers.push({ ...this.payingPassenger });
// left to load the array and database for transactions
const saDate = this.convertToSouthAfricaTime(new Date().toISOString());

if(this.place && this.price){
this.transaction = {
  TransactionID: '',
  VehicleId: this.vehicle.vehicleId,
  passengerId: passenger.passengerId,
  From_To: this.place,
  Amount: this.price,
  dateTime: saDate
};

this. addTransaction();

}
else{
  alert("amount and location is missing");
  this.auth.presentAlert("Error", "Select a route");
}
    return `New balance for passenger ${uid} is ${newBalance}`;
  }
 convertToSouthAfricaTime(utcDate: string): string {
    const date = new Date(utcDate);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }
  

  stopScan() {
    BarcodeScanner.stopScan();
    BarcodeScanner.showBackground(); 
  }


  // locations: { location: string; amount: number }[] = [];

  async fetchRoutes() {
    try {
      const routesSnapshot = await this.firestore.collection('routes').get().toPromise();
      if (routesSnapshot && !routesSnapshot.empty) {
        routesSnapshot.forEach(doc => {
          const data = doc.data() as Route;
          const location = `${data.from} - ${data.to}`;
          const amount = data.amount;

          this.locations.push({ location, amount });
        });
        console.log('Locations:', this.locations);
      } else {
        console.log('No routes found.');
      }
    // }
      console.log('Locations:', this.locations);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  }
}