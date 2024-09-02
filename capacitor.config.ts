// import { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'io.ionic.starter',
//   appName: 'EasyTicketPay',
//   webDir: 'www',
//   server: {
//     androidScheme: 'https'
//   }
  
// };

// export default config;
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'EasyTicketPay',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    BarcodeScanner: {
      cameraPermission: 'Camera access is required to scan barcodes'
    }
  }
};

export default config;
