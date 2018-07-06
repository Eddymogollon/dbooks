import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async onChangePayment(form: NgForm, command) {
    const { name, cardNumber, expDate, securityCode } = form.value;
    const keyCode = (Math.floor(Math.random() * 100000)).toString();
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    if (command === 'cancel') {
      console.log('User canceled');
      form.reset();
      return;
    }

    if (confirm(`Are you sure you want to add a new payment method?`)) {
      let allPayments = await firebase.database().ref(`/users/${user.uid}/payments`).once('value');
      allPayments = allPayments ? allPayments.val() : null;

      const formData = { name, cardNumber, expDate, securityCode };

      if (allPayments === null) {
        firebase.database().ref(`/users/${uid}/payments`).set({[keyCode]: formData});
      } else {
        allPayments[keyCode] = formData;
        firebase.database().ref(`/users/${uid}/payments`).set(allPayments);
      }

      alert('New payment method added');

    }

    form.reset();

  }

}
