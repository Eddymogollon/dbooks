import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../../shared/data-storage.service';
import * as firebase from 'firebase';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  email = '';

  constructor() { }

  ngOnInit() {
    const user = firebase.auth().currentUser;
    console.log(user.uid);
    firebase.database().ref(`/users/${user.uid}`).once('value').then((snapshot) => {
      const userInfo = snapshot.val();
      console.log(userInfo);
      console.log(userInfo.email);

      this.email = userInfo.email;

    });
  }

  onChangeEmail(form: NgForm, command) {
    const currentPassword = form.value.currentPassword;
    const newEmail = form.value.newEmail;
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    console.log(form.value);
    if (command === 'cancel') {
      console.log('User canceled');
      form.reset();
      return;
    }

    // tslint:disable-next-line:max-line-length
    const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

    if (!emailRegex.exec(newEmail)) {
      alert(`The email format is incorrect. Make sure you are typing a valid email. Please try again.`);
      return;
    }

    const passRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

    if (!passRegex.exec(currentPassword)) {
      alert(`Current password is not strong enough. Password should be:
      At least one upper case English letter
      At least one lower case English letter
      At least one digit
      At least one special character
      Minimum eight in length

      Please try again.`);
      return;
    }

    if (confirm(`Are you sure you want to change your email to ${newEmail}?`)) {
      firebase.database().ref(`/users/${uid}/email`).set(newEmail);

      const credential = firebase.auth.EmailAuthProvider.credential(this.email, currentPassword);

      user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
        // User re-authenticated.
        user.updateEmail(newEmail).then(() => {
          console.log('Email updated!');
        }).catch((error) => { console.log(error); });
      }).catch((error) => { console.log(error); });

    }

    form.reset();
  }

}
