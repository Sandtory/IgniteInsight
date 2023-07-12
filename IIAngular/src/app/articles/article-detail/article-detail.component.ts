import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { SubscribeModalComponent } from 'src/app/modal/subscribe-modal/subscribe-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  article: any;
  darkMode = false;
  viewCount = 0;
  tracking = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    // Get the ID from the route parameter
    const id = this.route.snapshot.paramMap.get('id');
    // Check if id is null
    if (id === null) {
      // Handle the error appropriately. For example:
      console.error('Article ID is null');
      return;
    }
    // Use the ID to fetch the article from your backend
    this.articleService.getArticle(id).subscribe(article => {
      this.article = article;
      this.startViewTracking(id);
    });
    this.themeService.isDarkTheme.subscribe(darkMode => {
      this.darkMode = darkMode;
    });
  }

  ngOnDestroy() {
    this.tracking = false;
  }

  startViewTracking(articleId: string) {
    this.tracking = true;
    this.viewCount = 0;

    interval(1000).pipe(
      takeWhile(() => this.tracking && this.viewCount < 20)
    ).subscribe(() => {
      this.viewCount += 1;

      if (this.viewCount % 10 === 0) {
        this.incrementViewCount(articleId);
      }
    });
  }

  incrementViewCount(articleId: string) {
    fetch(`http://localhost:3000/api/articles/${articleId}/views`, {
      method: 'POST',
    });
  }

  openSubscribeModal(event: any) {
    event.preventDefault();
    this.modalService.open(SubscribeModalComponent);
  }
}
