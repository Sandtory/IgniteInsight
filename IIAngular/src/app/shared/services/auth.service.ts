import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false); // Add this line

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
      }
    });
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async register(email: string, password: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
