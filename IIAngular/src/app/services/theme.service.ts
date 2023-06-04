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

  constructor(@Inject(DOCUMENT) private document: Document) {}

  setDarkTheme(isDarkTheme: boolean) {
    this._darkTheme.next(isDarkTheme);
    if (isDarkTheme) {
      this.currentMode = Mode.DARK;
    } else {
      this.currentMode = Mode.LIGHT;
    }
    this.updateBodyClasses();
    localStorage.setItem('theme', this.currentMode);
  }

  toggleMode() {
    if (this.currentMode === Mode.LIGHT) {
      this.currentMode = Mode.DARK;
    } else {
      this.currentMode = Mode.LIGHT;
    }
    this._darkTheme.next(this.currentMode === Mode.DARK);
    this.updateBodyClasses();
  }

  private updateBodyClasses() {
    if (this.currentMode === Mode.DARK) {
      this.document.body.classList.add(Mode.DARK);
      this.document.body.classList.remove(Mode.LIGHT);
    } else {
      this.document.body.classList.add(Mode.LIGHT);
      this.document.body.classList.remove(Mode.DARK);
    }
  }
}
