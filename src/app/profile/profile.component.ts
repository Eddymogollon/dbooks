import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  fullName = '...';
  email = '...';
  defaultAddress = null;


  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.getUserInfo();
  }


  getUserInfo() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('hello');
        console.log(user.uid);


        firebase.database().ref(`/users/${user.uid}`).once('value').then((snapshot) => {
          const userInfo = snapshot.val();
          console.log(userInfo);
          console.log(userInfo.email);

          this.fullName = userInfo.name;
          this.email = userInfo.email;

          this.defaultAddress = userInfo.defaultAddress;

        });

      }
      return;
    });
  }




}
