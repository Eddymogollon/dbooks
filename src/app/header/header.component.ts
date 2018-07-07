import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import * as firebase from 'firebase';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  isUserAuthenticated = null;

  ngOnInit() {
    // this.isUserAuthenticated = !this.authService.isAuthenticated() ? true : false;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.isUserAuthenticated = true;
      } else {
        this.isUserAuthenticated = false;
      }
      return;
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
