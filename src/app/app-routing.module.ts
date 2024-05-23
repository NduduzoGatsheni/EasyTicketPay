import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Taxi_Driver_Pages/driver-tabs/driver-tabs.module').then( m => m.DriverTabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'trips',
    loadChildren: () => import('./trip/trips.module').then( m => m.TripsPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OTPPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'password-changed',
    loadChildren: () => import('./password-changed/password-changed.module').then( m => m.PasswordChangedPageModule)
  },
  {
    path: 'taxi',
    loadChildren: () => import('./taxi/taxi.module').then( m => m.TaxiPageModule)
  },
  {
    path: 'bus',
    loadChildren: () => import('./bus/bus.module').then( m => m.BusPageModule)
  },
  {
    path: 'train',
    loadChildren: () => import('./train/train.module').then( m => m.TrainPageModule)
  },
  {
    path: 'confirm-payment',
    loadChildren: () => import('./confirm-payment/confirm-payment.module').then( m => m.ConfirmPaymentPageModule)
  },
  {
    path: 'sending-payment',
    loadChildren: () => import('./sending-payment/sending-payment.module').then( m => m.SendingPaymentPageModule)
  },
  {
    path: 'successfully',
    loadChildren: () => import('./successfully/successfully.module').then( m => m.SuccessfullyPageModule)
  },
  {
    path: 'view-card',
    loadChildren: () => import('./view-card/view-card.module').then( m => m.ViewCardPageModule)
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./Taxi_Driver_Pages/scan-qr/scan-qr.module').then( m => m.ScanQRPageModule)
  },
  // {
  //   path: 'vehicle-profile',
  //   loadChildren: () => import('./Taxi_Driver_Pages/vehicle-profile/vehicle-profile.module').then( m => m.VehicleProfilePageModule)
  // },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
