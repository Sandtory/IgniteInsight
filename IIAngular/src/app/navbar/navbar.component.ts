import { Component } from '@angular/core';
import { ArticleService } from '../articles/article.service';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { LoginRegisterModalComponent } from '../modal/login-register-modal/login-register-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  darkMode = false;
  constructor(
    private articleService: ArticleService,
    private searchService: SearchService,
    private router: Router,
    private themeService: ThemeService,
    private modalService: NgbModal,
  ) {
    this.themeService.isDarkTheme.subscribe((darkMode) => {
      this.darkMode = darkMode;
    });
  }

  ngOnInit(): void {}

  onSearch(q: string) {
    this.articleService.searchArticles(q).subscribe((articles) => {
      this.searchService.setSearchResults(articles);
      this.router.navigate(['/articles']);
    });
  }
  toggleMode() {
    this.themeService.toggleMode();
  }
  // openLoginRegisterModal(event: any) {
  //   event.preventDefault();
  //   this.modalService.open(LoginRegisterModalComponent);
  // }
}
