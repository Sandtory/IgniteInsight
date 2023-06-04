import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

enum Mode {
  DARK = 'dark',
  LIGHT = 'light'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme = this._darkTheme.asObservable();

  currentMode: Mode = Mode.LIGHT;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const savedTheme = localStorage.getItem('darkMode');
    const initialTheme = savedTheme !== null ? JSON.parse(savedTheme) : false;
    this._darkTheme = new BehaviorSubject<boolean>(initialTheme);
    this.isDarkTheme = this._darkTheme.asObservable();
  }

  setDarkTheme(isDarkTheme: boolean) {
    localStorage.setItem('darkMode', JSON.stringify(isDarkTheme));
    this._darkTheme.next(isDarkTheme);
  }

  toggleMode() {
    this.document.body.classList.toggle(Mode.LIGHT);
    this.document.body.classList.toggle(Mode.DARK);
    if (this.currentMode === Mode.LIGHT) {
      this.currentMode = Mode.DARK;
    } else {
      this.currentMode = Mode.LIGHT;
    }
    this.setDarkTheme(this.currentMode === Mode.DARK);

    localStorage.setItem('theme', this.currentMode);
  }
}