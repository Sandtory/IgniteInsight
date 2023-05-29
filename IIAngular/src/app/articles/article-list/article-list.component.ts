import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: any[]= [];

  constructor(
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe(articles => {
      console.log(articles); // Add this line
      this.articles = articles;
    });
  }

}
