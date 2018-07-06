import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async onChangeAddress(form: NgForm, command) {

    const { country, fullName, streetAddress1,
      streetAddress2, city, state, zipCode,
      phoneNumber, instruction } = form.value;
    const keyCode = (Math.floor(Math.random() * 100000)).toString();
    const user = firebase.auth().currentUser;
    const uid = user.uid;

      // add make default

    console.log(form.value);
    if (command === 'cancel') {
      console.log('User canceled');
      form.reset();
      return;
    }

    if (confirm(`Are you sure you want to add a new address?`)) {
      // firebase.database().ref(`/users/${user.uid}`).once('value').then((snapshot) => {
      let allAddresses = await firebase.database().ref(`/users/${user.uid}/addresses`).once('value');
      // firebase.database().ref(`/users/${uid}/newAddresses`).set(form.value);
      allAddresses = allAddresses ? allAddresses.val() : null;

      const formData = {country, fullName, streetAddress1, streetAddress2,
        city, state, zipCode, phoneNumber, instruction, keyCode };

      if (allAddresses === null) {
        // firebase.database().ref(`/users/${uid}/addresses`).set([(isDefault ? oldDefaultAddress : formData)]);
        firebase.database().ref(`/users/${uid}/addresses`).set({[keyCode]: formData});
      } else {
        allAddresses[keyCode] = formData;
        firebase.database().ref(`/users/${uid}/addresses`).set(allAddresses);
      }

      alert('New address added');

    }

    form.reset();
  }

}
