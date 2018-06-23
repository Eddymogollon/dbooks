import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  mockData = {
    hasAddress: true,
    defaultAddress: {
      name: 'Eddy Jesus Mogollon',
      mainAddress: '24 Jefferson Avenue',
      secondaryAddress: '',
      country: 'United States',
      city: 'Jersey City',
      state: 'NJ',
      zipCode: '07301',
      phoneNumber: '7862221668',
      instructions: 'Ring the bell...'
    },
    addresses: [{
        name: '1Eddy Jesus Mogollon',
        mainAddress: '24 Jefferson Avenue',
        secondaryAddress: '',
        country: 'United States',
        city: 'Jersey City',
        state: 'NJ',
        zipCode: '07301',
        phoneNumber: '7862221668',
        instructions: 'Ring the bell...'
      },
      {
        name: '2Eddy Jesus Mogollon',
        mainAddress: '24 Jefferson Avenue',
        secondaryAddress: '',
        country: 'United States',
        city: 'Jersey City',
        state: 'NJ',
        zipCode: '07301',
        phoneNumber: '7862221668',
        instructions: 'Ring the bell...'
      },
      {
        name: '3Eddy Jesus Mogollon',
        mainAddress: '24 Jefferson Avenue',
        secondaryAddress: '',
        country: 'United States',
        city: 'Jersey City',
        state: 'NJ',
        zipCode: '07301',
        phoneNumber: '7862221668',
        instructions: 'Ring the bell...'
      }]
  };

  constructor() { }

  ngOnInit() {
  }


  onTestButton() {
    this.mockData.hasAddress = !this.mockData.hasAddress;
  }

}
