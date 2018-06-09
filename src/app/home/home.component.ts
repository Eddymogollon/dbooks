import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
  }

  createData() {
    this.dataStorageService.storeData()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  receiveData() {
    this.dataStorageService.getData();
  }

  onLogout() {
    console.log('Logging out');
    this.authService.logout();
  }

  checkDatabase() {
    const usersRef = firebase.database().ref('users/');

    usersRef.update ({
      Ricardo: {
         numbera: 1,
         age: 15,
         number: 1
      },
      Amanda: {
         number: 2,
         age: 58
      }
   });


  }


}
