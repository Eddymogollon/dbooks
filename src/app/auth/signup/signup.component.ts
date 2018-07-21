import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    const fullName = form.value.fullname;

    // tslint:disable-next-line:max-line-length
    const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

    if (!emailRegex.exec(email)) {
      alert(`The email format is incorrect. Make sure you are typing a valid email. Please try again.`);
      return;
    }

    const passRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

    if (!passRegex.exec(password)) {
      alert(`Password is not strong enough. Password should be:
      At least one upper case English letter
      At least one lower case English letter
      At least one digit
      At least one special character
      Minimum eight in length

      Please try again.`);
    } else {
      this.authService.signupUser(email, password, fullName);
      console.log('User created');
    }
  }


}
