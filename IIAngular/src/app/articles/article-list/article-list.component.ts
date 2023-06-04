import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeModalComponent } from 'src/app/subscribe-modal/subscribe-modal.component';
import { SearchService } from 'src/app/services/search.service';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  darkMode = false;
  errorMessage: string | null = null;
  dummyArticles: any[] = [];

  constructor(
    private articleService: ArticleService,
    private modalService: NgbModal,
    private searchService: SearchService,
    private themeService: ThemeService,
  ) {
    for (let i = 1; i <= 6; i++) {
      this.dummyArticles.push({
        _id: i.toString(),
        imageUrl: `assets/stock${i}.png`, // replace with your actual image paths
        date: new Date(),
        title: `Dummy Article ${i}`,
        content: `This is a dummy article number ${i}.`
      });
    }
  }

  ngOnInit() {
    // Update articles when search results change
    this.searchService.searchResults$.subscribe(articles => {
      if (articles.length > 0) {
        this.articles = articles;
        this.errorMessage = null;
      } else {
        // Only fetch all articles if there are no search results
        this.articleService.getArticles().subscribe(allArticles => {
          if (allArticles.length > 0) {
            this.articles = allArticles;
          } else {
            this.articles = this.dummyArticles;
          }
        });
        this.errorMessage = 'Cannot find any articles under that name';
      }
    });
    this.themeService.isDarkTheme.subscribe(darkMode => {
      this.darkMode = darkMode;
    });
  }
  
  openSubscribeModal(event: any) {
    event.preventDefault();
    this.modalService.open(SubscribeModalComponent);
  }
}
