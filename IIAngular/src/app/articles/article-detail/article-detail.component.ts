import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { SubscribeModalComponent } from 'src/app/modal/subscribe-modal/subscribe-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: any;
  darkMode = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private modalService: NgbModal,
    private renderer: Renderer2, 
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


      const script = this.renderer.createElement('script');
      script.src = 'assets/scripts/articleViewTracker.js'; // Replace with the correct path to the script file
      this.renderer.appendChild(document.body, script);

      const articleLink = this.renderer.createElement('a');
      this.renderer.setAttribute(articleLink, 'id', 'articleLink');
      this.renderer.setAttribute(articleLink, 'data-article-id', id);
      this.renderer.appendChild(document.body, articleLink);
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
