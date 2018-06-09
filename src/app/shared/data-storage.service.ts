import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import 'rxjs/Rx';


// import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
// import { map, filter, scan } from 'rxjs/operators';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private authService: AuthService) {}


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



