import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'IIAngular';
  darkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.isDarkTheme.subscribe(darkMode => {
      this.darkMode = darkMode;
    });
  }
}
