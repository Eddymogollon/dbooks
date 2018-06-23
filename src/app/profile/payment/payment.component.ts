import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  mockData = {
    hasPayment: true,
    defaultPayment: {
      cardName: 'Eddy Mogollon',
      cardNumber: 'Card ends in ...5487',
      expDate: {
        month: '10',
        year: '2023'
      },
      securityCode: '214'
    },
    payments: [{
      cardName: 'Eddy Mogollon',
      cardNumber: 'Card ends in ...4932',
      expDate: {
        month: '10',
        year: '2023'
      },
      securityCode: '375'
    },
    {
      cardName: 'Eddy Mogollon',
      cardNumber: 'Card ends in ...1238',
      expDate: {
        month: '10',
        year: '2023'
      },
      securityCode: '642'
    },
    {
      cardName: 'Eddy Mogollon',
      cardNumber: 'Card ends in ...2365',
      expDate: {
        month: '10',
        year: '2023'
      },
      securityCode: '264'
    }]
  };

  constructor() { }

  ngOnInit() {
  }

  onTestButton() {
    this.mockData.hasPayment = !this.mockData.hasPayment;
  }

}
