import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  hasPayment = false;
  payments = [];
  listPayments = [];
  defaultPayment = null;

  mockData = {

    hasPayment: true,
    defaultPayment: {
      cardName: 'Eddy Mogollon',
      cardNumber: 'Card ends in ...5487',
      expDate: {
        month: '10',
        year: '2023'
      },
      securityCode: '214',
      keyCode: '1000'
    },
    paymentsTest: {
      '1001': {
        cardName: 'Eddy Mogollon',
        cardNumber: 'Card ends in ...4932',
        expDate: {
          month: '10',
          year: '2023'
        },
        securityCode: '375',
        keyCode: '1001'
      },
      '1002': {
        cardName: 'Eddy J Mogollon',
        cardNumber: 'Card ends in ...1238',
        expDate: {
          month: '10',
          year: '2023'
        },
        securityCode: '642',
        keyCode: '1002'
      },
      '1003': {
        cardName: 'Eddy Mogollon',
        cardNumber: 'Card ends in ...2365',
        expDate: {
          month: '10',
          year: '2023'
        },
        securityCode: '264',
        keyCode: '1003'
      }
    },

    payments: [{
      cardName: 'Eddy Mogollon',
      cardNumber: 'Card ends in ...4932',
      expDate: {
        month: '10',
        year: '2023'
      },
      securityCode: '375',
      keyCode: '1001'
    },
    {
      cardName: 'Eddy Mogollon',
      cardNumber: 'Card ends in ...1238',
      expDate: {
        month: '10',
        year: '2023'
      },
      securityCode: '642',
      keyCode: '1002'
    },
    {
      cardName: 'Eddy Mogollon',
      cardNumber: 'Card ends in ...2365',
      expDate: {
        month: '10',
        year: '2023'
      },
      securityCode: '264',
      keyCode: '1003'
    }]
  };

  constructor() { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        const allPayments = await firebase.database().ref(`/users/${user.uid}/payments`).once('value');
        const defaultPayment = await firebase.database().ref(`/users/${user.uid}/defaultPayment`).once('value');
        console.log(allPayments.val());
        console.log(defaultPayment.val());

        if (allPayments.val() || defaultPayment.val()) {
          this.payments = allPayments.val();
          this.defaultPayment = defaultPayment.val();
          this.hasPayment = true;

          this.listPayments = Object.keys(this.payments);

        }
      }
    });
  }

  onRemovePayment(paymentId) {
    const user = firebase.auth().currentUser;

    console.log(paymentId);
    const address = firebase.database().ref(`/users/${user.uid}/payments/${paymentId}`).remove();
    const index = this.listPayments.indexOf(paymentId);
    this.listPayments.splice(index, 1);
    this.payments[paymentId] = null;
  }

  onMakeDefault(paymentId) {
    const user = firebase.auth().currentUser;

    const defaultPayment = this.defaultPayment;
    this.defaultPayment = this.payments[paymentId];
    const index = this.listPayments.indexOf(paymentId);
    this.listPayments[index] = defaultPayment.keyCode;
    console.log(this.listPayments);

    this.payments[defaultPayment.keyCode] = defaultPayment;
    this.payments[paymentId] = null;

    firebase.database().ref(`/users/${user.uid}/payments`).update(this.payments);
    firebase.database().ref(`/users/${user.uid}/defaultPayment`).update(this.defaultPayment);

  }

  onTestButton() {
    this.mockData.hasPayment = !this.mockData.hasPayment;
  }

}
