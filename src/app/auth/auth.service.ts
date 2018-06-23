import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string, fullName: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log('ed');

        const userSignedUp = true;

        // error when clicking for the first time
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log('im in');
            if (userSignedUp) {
              console.log(user.uid);
              const usersRef = firebase.database().ref('users/');
              usersRef.update({
                [user.uid]: {
                  email: user.email,
                  uid: user.uid,
                  name: fullName
                }
              });
              this.router.navigate(['/profile']);
            }
            return;
          }
        })();

      })
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;
                console.log('User logged in');
                this.router.navigate(['/profile']);
              }
            );
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken();
    return this.token;
  }

  isAuthenticated() {
    if (firebase.auth().currentUser != null) {
      return true;
    } else {
      return null;
    }
  }

  // testGetId() {
  //   return firebase.auth().currentUser
  // }

}
