import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './profile/account/account.component';
import { PaymentComponent } from './profile/payment/payment.component';
import { AddressComponent } from './profile/address/address.component';

import { NameComponent } from './profile/account/name/name.component';
import { EmailComponent } from './profile/account/email/email.component';
import { PasswordComponent } from './profile/account/password/password.component';
import { NewAddressComponent } from './profile/address/new-address/new-address.component';
import { NewPaymentComponent } from 'src/app/profile/payment/new-payment/new-payment.component';

import { BooksComponent } from './books/books.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'book_details', component: BookdetailsComponent },
  { path: 'sign_in', component: SigninComponent },
  { path: 'sign_up', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canLoad: [AuthGuard] },
  { path: 'profile/account', component: AccountComponent },
  { path: 'profile/account/name', component: NameComponent },
  { path: 'profile/account/email', component: EmailComponent },
  { path: 'profile/account/password', component: PasswordComponent},
  { path: 'profile/payment', component: PaymentComponent },
  { path: 'profile/payment/new-payment', component: NewPaymentComponent },
  { path: 'profile/address', component: AddressComponent },
  { path: 'profile/address/new-address', component: NewAddressComponent },
  { path: 'profile/address/edit-address', component: NewAddressComponent },
  { path: 'books', component: BooksComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
