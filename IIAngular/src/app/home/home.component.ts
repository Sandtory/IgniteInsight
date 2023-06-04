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
    // Add more dummy articles as needed
  ];
  

  constructor(
    private articleService: ArticleService,
    private themeService: ThemeService,
    ) { }

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
