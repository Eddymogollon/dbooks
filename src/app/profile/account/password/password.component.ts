import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../../shared/data-storage.service';
import * as firebase from 'firebase';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  email = '...';

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

  }

  onChangePassword(form: NgForm, command) {
    const currentPassword = form.value.currentPassword;
    const newPassword = form.value.newPassword;
    const confirmPassword = form.value.confirmPassword;
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    console.log(form.value);
    if (command === 'cancel') {
      console.log('User canceled');
      form.reset();
      return;
    }

    if (currentPassword === newPassword || currentPassword === confirmPassword) {
      console.log('Names are the same. No changes made.');
      form.reset();
      return;
    }

    if (newPassword !== confirmPassword) {
      console.log('Passwords are different. No changes made.');
    }

    if (confirm(`Are you sure you want to change your password to ${newPassword}?`)) {

      const credential = firebase.auth.EmailAuthProvider.credential(this.email, currentPassword);

      user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
        // User re-authenticated.
        user.updatePassword(newPassword).then(() => {
          console.log('Password updated!');
        }).catch((error) => { console.log(error); });
      }).catch((error) => { console.log(error); });

    }

    form.reset();
  }

}
