import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  fullName = null;
  email = null;
  defaultAddress = null;
  defaultPayment = null;
  hasNameAndEmail = null;
  hasDefaultAddress = null;
  hasDefaultPayment = null;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

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

          this.hasDefaultAddress = userInfo.defaultAddress ? true : false;
          this.hasNameAndEmail = userInfo.name ? true : false;
          this.hasDefaultPayment = userInfo.defaultPayment ? true : false;
          // console.log(userInfo.defaultAddress);

          this.defaultAddress = userInfo.defaultAddress;
          this.defaultPayment = userInfo.defaultPayment;
        });


      } else {
        this.router.navigate(['/sign_in']);
      }
      return;
    });
  }




}
