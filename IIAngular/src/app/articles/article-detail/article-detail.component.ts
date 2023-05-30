import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { SubscribeModalComponent } from 'src/app/subscribe-modal/subscribe-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private modalService: NgbModal,
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
    });
  }
  openSubscribeModal(event: any) {
    event.preventDefault();
    this.modalService.open(SubscribeModalComponent);
  }
  
  
}
