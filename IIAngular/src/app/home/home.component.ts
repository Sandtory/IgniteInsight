import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../articles/article.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
