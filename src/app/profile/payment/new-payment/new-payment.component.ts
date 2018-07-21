import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        this.router.navigate(['/sign_in']);
      }
    });
  }

  async onChangePayment(form: NgForm, command) {
    const { name, expDate, securityCode } = form.value;
    let { cardNumber } = form.value;
    const keyCode = (Math.floor(Math.random() * 100000)).toString();
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    if (command === 'cancel') {
      console.log('User canceled');
      form.reset();
      return;
    }

    if (name === '' || cardNumber === '' || expDate === '' || securityCode === '') {
      alert('Missing at least one input. Please fill out all information before submitting.');
      return;
    }

    const cardNumberRegex = /^\d{16}$/;
    const cardNumberRegexDashes = /^\d{4}\-\d{4}\-\d{4}\-\d{4}$/;

    if (cardNumberRegex.exec(cardNumber) != null) {
      console.log('Numbers are together');
      cardNumber = `${cardNumber.slice(0, 4)}-${cardNumber.slice(4, 8)}-${cardNumber.slice(8, 12)}-${cardNumber.slice(12, 16)}`;
    } else if (cardNumberRegexDashes.exec(cardNumber)) {
      console.log('Number has dashes');
    } else {
      alert('Invalid card number. Make sure you type a 16 digit card number');
      return;
    }

    const expDateRegex = /(0[1-9]|10|11|12)\/20[0-9]{2}/g;
    if (!(expDateRegex.exec(expDate))) {
      alert(`Wrong expiration date format. Please put the expiration date correctly.
      It should follow the format MM/YYYY and the maximum year is 2099.`);
      return;
    }

    const securityCodeRegex = /(^[0-9][0-9][0-9]$)/;
    if (!(securityCodeRegex.exec(securityCode))) {
      alert('Wrong security code format. A security code needs to be three numbers');
      return;
    }

    if (confirm(`Are you sure you want to add a new payment method?`)) {
      let allPayments = await firebase.database().ref(`/users/${user.uid}/payments`).once('value');
      allPayments = allPayments ? allPayments.val() : null;

      const salt = bcrypt.genSaltSync(10);
      const hashedCardNumber = bcrypt.hashSync(cardNumber, salt);

      const formData = { name, cardNumber: cardNumber.slice(15), expDate, securityCode, keyCode, hashedCardNumber };

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
