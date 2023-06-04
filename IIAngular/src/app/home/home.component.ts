import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../articles/article.service';
import { ThemeService } from '../services/theme.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topArticles: any[] = [];
  darkMode = false;
  dummyArticles: any[] = [];
  
  

  constructor(
    private articleService: ArticleService,
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
      this.articleService.getTopArticles().subscribe((articles: any) => {
        if (articles.length === 0) {
          this.topArticles = this.dummyArticles;
        } else {
          this.topArticles = articles;
        }
      });
      this.themeService.isDarkTheme.subscribe(darkMode => {
        this.darkMode = darkMode;
      });
    }
    
  
}
