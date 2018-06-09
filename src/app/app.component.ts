import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


// import { Http, Response } from '@angular/http';
// import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
      firebase.initializeApp({
        apiKey: 'AIzaSyBvZ-tCxqvLztwKHL5X8XxGkotPpJ6ljEs',
        authDomain: 'soft-eng-c17d5.firebaseapp.com',
        databaseURL: 'soft-eng-c17d5.firebaseio.com'
      });

      // Http.put('https://soft-eng-c17d5.firebaseio.com/recipes.json', {hello: 'hello'});

      console.log('Initialized');
  }


}



