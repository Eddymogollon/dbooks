import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  hasAddress = null;
  addresses = {};
  listAddresses = [];
  defaultAddress = null;
  hasDefaultAddress = null;

  constructor() { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        const allAddresses = await firebase.database().ref(`/users/${user.uid}/addresses`).once('value');
        const defaultAddress = await firebase.database().ref(`/users/${user.uid}/defaultAddress`).once('value');
        console.log(allAddresses.val());
        console.log(defaultAddress.val());

        if (allAddresses.val()) {
          this.addresses = allAddresses.val();
          this.hasAddress = true;
          this.listAddresses = Object.keys(this.addresses);
        }

        if (defaultAddress.val()) {
          this.defaultAddress = defaultAddress.val();
          this.hasAddress = true;
          this.hasDefaultAddress = true;
        }

        this.hasAddress = (defaultAddress.val() || allAddresses.val()) ? true : false;

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

  onRemoveDefaultAddress(addressId) {
    const user = firebase.auth().currentUser;
    const address = firebase.database().ref(`/users/${user.uid}/defaultAddress`).remove();
    this.hasDefaultAddress = false;
    this.defaultAddress = null;
  }

  onMakeDefault(addressId) {
    const user = firebase.auth().currentUser;

    const index = this.listAddresses.indexOf(addressId);
    console.log(this.defaultAddress);
    if (!this.defaultAddress) { // If default address is empty
      this.defaultAddress = this.addresses[addressId];
      this.listAddresses.splice(index, 1);
      this.hasDefaultAddress = true;
      console.log(this.defaultAddress);
    } else {
      const defaultAddress = this.defaultAddress;
      this.defaultAddress = this.addresses[addressId];

      this.listAddresses[index] = defaultAddress.keyCode;
      this.addresses[defaultAddress.keyCode] = defaultAddress;
    }
    this.addresses[addressId] = null;

    firebase.database().ref(`/users/${user.uid}/addresses`).update(this.addresses);
    firebase.database().ref(`/users/${user.uid}/defaultAddress`).update(this.defaultAddress);
  }


}
