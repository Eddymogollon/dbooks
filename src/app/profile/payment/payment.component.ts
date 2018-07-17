import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  hasPayment = null;
  payments = [];
  listPayments = [];
  defaultPayment = null;
  hasDefaultPayment = null;

  constructor(private router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        const allPayments = await firebase.database().ref(`/users/${user.uid}/payments`).once('value');
        const defaultPayment = await firebase.database().ref(`/users/${user.uid}/defaultPayment`).once('value');
        console.log(allPayments.val());
        console.log(defaultPayment.val());

        if (allPayments.val()) {
          this.payments = allPayments.val();
          this.hasPayment = true;
          this.listPayments = Object.keys(this.payments);
        }

        if (defaultPayment.val()) {
          this.defaultPayment = defaultPayment.val();
          this.hasPayment = true;
          this.hasDefaultPayment = true;
        }

        this.hasPayment = (defaultPayment.val() || allPayments.val()) ? true : false;

      } else {
        this.router.navigate(['/sign_in']);
      }
    });
  }

  onRemovePayment(paymentId) {
    const user = firebase.auth().currentUser;

    console.log(paymentId);
    const payment = firebase.database().ref(`/users/${user.uid}/payments/${paymentId}`).remove();
    const index = this.listPayments.indexOf(paymentId);
    this.listPayments.splice(index, 1);
    this.payments[paymentId] = null;
  }

  onRemoveDefaultPayment(paymentId) {
    const user = firebase.auth().currentUser;
    const payment = firebase.database().ref(`/users/${user.uid}/defaultPayment`).remove();
    this.hasDefaultPayment = false;
    this.defaultPayment = null;
  }

  onMakeDefault(paymentId) {
    const user = firebase.auth().currentUser;

    const index = this.listPayments.indexOf(paymentId);
    console.log(this.defaultPayment);

    if (!this.defaultPayment) { // If default payment is empty
      this.defaultPayment = this.payments[paymentId];
      this.listPayments.splice(index, 1);
      this.hasDefaultPayment = true;
      console.log('No default payment');
      console.log(this.defaultPayment);
      console.log(this.listPayments);

    } else {
      const defaultPayment = this.defaultPayment;
      this.defaultPayment = this.payments[paymentId];

      this.listPayments[index] = defaultPayment.keyCode;
      this.payments[defaultPayment.keyCode] = defaultPayment;

      console.log('Has default payment');
      console.log(this.defaultPayment);
      console.log(this.listPayments);
      console.log(this.payments);


    }

    this.payments[paymentId] = null;

    firebase.database().ref(`/users/${user.uid}/payments`).update(this.payments);
    firebase.database().ref(`/users/${user.uid}/defaultPayment`).update(this.defaultPayment);

  }

}
