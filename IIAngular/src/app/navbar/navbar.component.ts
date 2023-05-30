import { Component } from '@angular/core';
import { ArticleService } from '../articles/article.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private articleService: ArticleService) { }

  onSearch(q: string) {
    this.articleService.searchArticles(q).subscribe(articles => {
      // Do something with the articles
    });
  }
}
