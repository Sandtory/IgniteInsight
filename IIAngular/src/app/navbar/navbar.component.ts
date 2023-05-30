import { Component } from '@angular/core';
import { ArticleService } from '../articles/article.service';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private articleService: ArticleService,
    private searchService: SearchService,
    private router: Router,
    ) { }

    onSearch(q: string) {
      this.articleService.searchArticles(q).subscribe(articles => {
        this.searchService.setSearchResults(articles);
        this.router.navigate(['/articles']);
      });
    }    
}
