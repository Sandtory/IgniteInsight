import { Component } from '@angular/core';
import { ArticleService } from '../articles/article.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { LoginRegisterModalComponent } from '../modal/login-register-modal/login-register-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from '../shared/services/search.service';
import { ThemeService } from '../shared/services/theme.service';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  darkMode = false;
  constructor(
    private articleService: ArticleService,
    private searchService: SearchService,
    private router: Router,
    private themeService: ThemeService,
    private modalService: NgbModal,
    private authService: AuthService,
  ) {
    this.themeService.isDarkTheme.subscribe((darkMode) => {
      this.darkMode = darkMode;
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }
  onSearch(q: string) {
    this.articleService.searchArticles(q).subscribe((articles) => {
      this.searchService.setSearchResults(articles);
      this.router.navigate(['/articles']);
    });
  }
  toggleMode() {
    this.themeService.toggleMode();
  }
  logout() {
    this.authService.logout().then(() => {
      window.alert('Logged out successfully');
    }).catch(error => {
      console.log(error);
    });
  }
  
  // openLoginRegisterModal(event: any) {
  //   event.preventDefault();
  //   this.modalService.open(LoginRegisterModalComponent);
  // }
}
