import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'driver-tabs',
    loadChildren: () => import('./Taxi_Driver_Pages/driver-tabs/driver-tabs.module').then( m => m.DriverTabsPageModule)
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
    path: 'sign-vehicle',
    loadChildren: () => import('./Taxi_Driver_Pages/sign-vehicle/sign-vehicle.module').then( m => m.SignVehiclePageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'personal-card',
    loadChildren: () => import('./personal-card/personal-card.module').then( m => m.PersonalCardPageModule)
  },
  {
    path: 'driver-transactions',
    loadChildren: () => import('./Taxi_Driver_Pages/driver-transactions/driver-transactions.module').then( m => m.DriverTransactionsPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
