import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async onChangePayment(form: NgForm, command) {
    const { name, cardNumber, expDate, securityCode } = form.value;

    if (command === 'cancel') {
      console.log('User canceled');
      form.reset();
      return;
    }

    if (name === '' || cardNumber === '' || expDate === '' || securityCode === '') {
      alert('Missing at least one input. Please fill out all information before submitting.');
      return;
    }

    const expDateRegex = /(0[1-9]|10|11|12)\/20[0-9]{2}/g;
    if (!(expDateRegex.exec(expDate))) {
      alert('Wrong expiration date format. Please put the expiration date correctly.');
      return;
    }

    const securityCodeRegex = /(^[0-9][0-9][0-9]$)/;
    if (!(securityCodeRegex.exec(securityCode))) {
      alert('Wrong security code format. Please insert three numbers.');
      return;
    }



    const keyCode = (Math.floor(Math.random() * 100000)).toString();
    const user = firebase.auth().currentUser;
    const uid = user.uid;

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
      this.router.navigate(['/profile/payment']);
    }

    form.reset();

  }

}
