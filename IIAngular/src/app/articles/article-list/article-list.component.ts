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
  dummyArticles = [
    {
      _id: '3',
      imageUrl: 'assets/IgniteInsight_logo4.png',
      date: new Date(),
      title: 'Dummy Article 3',
      content: 'This is the last dummy article.'
    },
    {
      _id: '2',
      imageUrl: 'assets/IgniteInsight_logo3.png',
      date: new Date(),
      title: 'Dummy Article 2',
      content: 'This is another dummy article.'
    },
    {
      _id: '1',
      imageUrl: 'assets/IgniteInsight_logo1.png',
      date: new Date(),
      title: 'Dummy Article 1',
      content: 'This is a dummy article.'
    },
  ];

  constructor(
    private articleService: ArticleService,
    private modalService: NgbModal,
    private searchService: SearchService,
    private themeService: ThemeService,
  ) {}

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
