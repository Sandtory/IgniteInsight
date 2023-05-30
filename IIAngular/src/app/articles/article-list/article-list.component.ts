import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeModalComponent } from 'src/app/subscribe-modal/subscribe-modal.component';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private articleService: ArticleService,
    private modalService: NgbModal,
    private searchService: SearchService
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
          this.articles = allArticles;
        });
        this.errorMessage = 'Cannot find any articles under that name';
      }
    });
  }
  openSubscribeModal(event: any) {
    event.preventDefault();
    this.modalService.open(SubscribeModalComponent);
  }
}
