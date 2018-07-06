import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  hasAddress = false;
  addresses = [];
  listAddresses = [];
  defaultAddress = {
    keyCode: null
  };

  mockData = {
    hasAddress: true,
    defaultAddress: {
      name: 'Eddy Jesus Mogollon',
      streetAddress1: '24 Jefferson Avenue',
      streetAddress2: '',
      country: 'United States',
      city: 'Jersey City',
      state: 'NJ',
      zipCode: '07301',
      phoneNumber: '7862221668',
      instructions: 'Ring the bell...'
    },
    addresses: [{
        name: '1Eddy Jesus Mogollon',
        streetAddress1: '24 Jefferson Avenue',
        streetAddress2: '',
        country: 'United States',
        city: 'Jersey City',
        state: 'NJ',
        zipCode: '07301',
        phoneNumber: '7862221668',
        instructions: 'Ring the bell...'
      },
      {
        name: '2Eddy Jesus Mogollon',
        streetAddress1: '24 Jefferson Avenue',
        streetAddress2: '',
        country: 'United States',
        city: 'Jersey City',
        state: 'NJ',
        zipCode: '07301',
        phoneNumber: '7862221668',
        instructions: 'Ring the bell...'
      },
      {
        name: '3Eddy Jesus Mogollon',
        streetAddress1: '24 Jefferson Avenue',
        streetAddress2: '',
        country: 'United States',
        city: 'Jersey City',
        state: 'NJ',
        zipCode: '07301',
        phoneNumber: '7862221668',
        instructions: 'Ring the bell...'
      }],
      addressesTest: {
        '123': {
        name: '1Eddy Jesus Mogollon',
        streetAddress1: '24 Jefferson Avenue',
        streetAddress2: '',
        country: 'United States',
        city: 'Jersey City',
        state: 'NJ',
        zipCode: '07301',
        phoneNumber: '7862221668',
        instructions: 'Ring the bell...'
      },
      '456': {
        name: '2Eddy Jesus Mogollon',
        streetAddress1: '24 Jefferson Avenue',
        streetAddress2: '',
        country: 'United States',
        city: 'Jersey City',
        state: 'NJ',
        zipCode: '07301',
        phoneNumber: '7862221668',
      }
    }
  };

  constructor() { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        const allAddresses = await firebase.database().ref(`/users/${user.uid}/addresses`).once('value');
        const defaultAddress = await firebase.database().ref(`/users/${user.uid}/defaultAddress`).once('value');
        console.log(allAddresses.val());
        console.log(defaultAddress.val());

        if (allAddresses.val() || defaultAddress.val()) {
          this.addresses = allAddresses.val();
          this.defaultAddress = defaultAddress.val();
          this.hasAddress = true;

          this.listAddresses = Object.keys(this.addresses);

        }
      }
    });

  }

  onRemoveAddress(addressId) {
    const user = firebase.auth().currentUser;

    console.log(addressId);
    const address = firebase.database().ref(`/users/${user.uid}/addresses/${addressId}`).remove();
    const index = this.listAddresses.indexOf(addressId);
    this.listAddresses.splice(index, 1);
    this.addresses[addressId] = null;
  }

  onMakeDefault(addressId) {
    const user = firebase.auth().currentUser;

    const defaultAddress = this.defaultAddress;
    this.defaultAddress = this.addresses[addressId];
    const index = this.listAddresses.indexOf(addressId);
    this.listAddresses[index] = defaultAddress.keyCode;
    console.log(this.listAddresses);

    this.addresses[defaultAddress.keyCode] = defaultAddress;
    this.addresses[addressId] = null;

    firebase.database().ref(`/users/${user.uid}/addresses`).update(this.addresses);
    firebase.database().ref(`/users/${user.uid}/defaultAddress`).update(this.defaultAddress);

  }


}
