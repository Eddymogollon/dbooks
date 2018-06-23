import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../../shared/data-storage.service';
import * as firebase from 'firebase';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onChangeName(form: NgForm, command) {
    const newName = form.value.newName;
    const uid = firebase.auth().currentUser.uid;
    // Use authorization to change name
    console.log(form.value);
    if (command === 'cancel') {
      console.log('User canceled');
      form.reset();
      return;
    }

    if (confirm(`Are you sure you want to change your name to ${newName}?`)) {
      firebase.database().ref(`/users/${uid}/name`).set(newName);
    }

    form.reset();
  }

}
