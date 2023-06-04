import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'IIAngular';
  darkMode = false;

  constructor(private themeService: ThemeService) {
    // Read the initial theme state from local storage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.darkMode = storedTheme === 'true';
      this.themeService.setDarkTheme(this.darkMode);
    }

    this.themeService.isDarkTheme.subscribe(darkMode => {
      this.darkMode = darkMode;
    });
  }
}
