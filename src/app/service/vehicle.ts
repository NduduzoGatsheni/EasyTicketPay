export interface Vehicle {
    vehicleId:string;
    ownerName: string;
    email: string;
    transportType: string;
    transportNumber: string;
    password: string;

    amount?:number;
    from_to?:string;
  }