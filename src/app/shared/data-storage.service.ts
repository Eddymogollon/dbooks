import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';
import 'rxjs/Rx';


// import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
// import { map, filter, scan } from 'rxjs/operators';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private authService: AuthService) {}


  doSomething() {
    console.log('Changing username to...');
    const uid = firebase.auth().currentUser.uid;
    console.log(uid);
    this.http.get(`https://soft-eng-c17d5.firebaseio.com/users/${uid}/email.json`).map(
        (response: Response) => response.json())
      .subscribe(
        (item) => {
          console.log(item);
        }
      );

    firebase.database().ref(`/users/${uid}/name`).once('value').then((snapshot) => snapshot.val());

    return firebase.database().ref(`/users/${uid}/name`).set('Eddy!!');
  }

  changeName() {
    const uid = firebase.auth().currentUser.uid;

    console.log(firebase.database().ref(`/users/${uid}/name`));
    firebase.database().ref(`/users/${uid}/name`).set('hello');
  }

  changeEmail() {
    console.log('Changing email to...');
  }

  changePassword() {
    console.log('Changing password to...');
  }

  storeData() {
    console.log('Storing data...');


    const userId = 'dasdasda';
    const myObj = {
      userId,
      name: 'Edd Mogollon',
      email: 'admin@gmail.com',
      physicalAddress: ['123 Main Street'],
      shippingAddress: ['456 Liberty Street'],
      numberOfBooks: 0,
      savedBooks: 0,
      shoppingCart: 0
    };

    const test = {};
    test[userId] = myObj;

    return this.http.put(`https://soft-eng-c17d5.firebaseio.com/users/${userId}.json`, myObj);
  }

  getData() {

    this.http.get('https://soft-eng-c17d5.firebaseio.com/recipes.json').map(
        (response: Response) => {
          const recipes = response.json();

          console.log(recipes);
          return recipes;
        }
      )
      .subscribe(
        (item) => {
          console.log(item);
        }
      );
  }

}



