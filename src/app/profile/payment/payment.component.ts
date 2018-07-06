import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  hasPayment = false;
  payments = [];
  listPayments = [];
  defaultPayments = {};

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
  }

  onTestButton() {
    this.mockData.hasPayment = !this.mockData.hasPayment;
  }

}
