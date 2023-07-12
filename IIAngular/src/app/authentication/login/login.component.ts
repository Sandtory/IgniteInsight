import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    console.log('LoginComponent.login called'); // Add this line
    this.authService.login(this.email, this.password).then(() => {
      window.alert('Logged in successfully');
      this.router.navigate(['/']);
    }).catch(error => {
      // Handle login errors here
      if (error.code === 'auth/invalid-email') {
        window.alert('The email address is not valid.');
      } else if (error.code === 'auth/user-disabled') {
        window.alert('The user corresponding to the given email has been disabled.');
      } else if (error.code === 'auth/user-not-found') {
        window.alert('There is no user corresponding to the given email.');
      } else if (error.code === 'auth/wrong-password') {
        window.alert('The password is invalid for the given email.');
      } else {
        window.alert('An unknown error occurred. Please try again.');
      }
    });
  }
  
  
}
