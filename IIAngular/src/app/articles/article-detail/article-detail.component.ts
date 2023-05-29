import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    // Get the ID from the route parameter
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Article ID:', id);
  
    // Check if id is null or not a valid number string
    if (id === null || isNaN(Number(id))) {
      // Handle the error appropriately. For example:
      console.error('Article ID is null or not a valid number string');
      return;
    }
  
    // Convert id to a number
    const idNumber = Number(id);
  
    // Use the ID to fetch the article from your backend
    this.articleService.getArticle(idNumber).subscribe(article => {
      this.article = article;
    });
  }
  
  
}
