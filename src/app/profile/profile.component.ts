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


  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('stuff happens');
    this.getUserInfo();
  }


  getUserInfo() {
    console.log('edd');



    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('hello');
        // const usersRef = firebase.database().ref('users/');
        console.log(user.uid);

        // usersRef.on('value', function(snapshot) {
        //   console.log(snapshot.val());
        // }, function (error) {
        //   console.log('Error: ' + error.code);
        // });

        firebase.database().ref(`/users/${user.uid}`).once('value').then((snapshot) => {
          const userInfo = snapshot.val();
          console.log(userInfo);
          console.log(userInfo.email);

          this.fullName = userInfo.name;
          this.email = userInfo.email;

          // ...
        });

      }
      return;
    });
  }




}
