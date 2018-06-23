import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';

import { AccountComponent } from './profile/account/account.component';
import { PaymentComponent } from './profile/payment/payment.component';
import { AddressComponent } from './profile/address/address.component';

import { NameComponent } from './profile/account/name/name.component';
import { EmailComponent } from './profile/account/email/email.component';
import { PasswordComponent } from './profile/account/password/password.component';
import { NewAddressComponent } from './profile/address/new-address/new-address.component';
import { BooksComponent } from './books/books.component';

import { DropDownComponent } from './drop-down/drop-down.component';

import { AuthService } from './auth/auth.service';
import { SignupComponent } from './auth/signup/signup.component';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewPaymentComponent } from './profile/payment/new-payment/new-payment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    BookdetailsComponent,
    HomeComponent,
    SigninComponent,
    AccountComponent,
    PaymentComponent,
    AddressComponent,
    BooksComponent,
    DropDownComponent,
    SignupComponent,
    PageNotFoundComponent,
    NameComponent,
    EmailComponent,
    PasswordComponent,
    NewAddressComponent,
    NewPaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [AuthService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }


