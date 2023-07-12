import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router'; // import Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) { } // inject Router

  onSubmit() {
    this.authService.register(this.email, this.password).then(() => {
      // Show an alert dialog after successful registration
      window.alert('User registered successfully');
      // Navigate to the login page after successful registration
      this.router.navigate(['/login']);
    }).catch(error => {
      // Handle registration errors here
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        window.alert('The email address is already in use by another account.');
      } else if (error.code === 'auth/invalid-email') {
        window.alert('The email address is not valid.');
      } else if (error.code === 'auth/operation-not-allowed') {
        window.alert('Email/password accounts are not enabled. Enable email/password in the Firebase Console, under the Auth tab.');
      } else if (error.code === 'auth/weak-password') {
        window.alert('The password is not strong enough.');
      } else {
        window.alert('An unknown error occurred. Please try again.');
      }
    });
  }
  
}
