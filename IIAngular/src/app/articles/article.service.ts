import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // private apiUrl = 'http://localhost:3000'; // Replace with your backend URL

  // constructor(private http: HttpClient) { }

  getArticles(): Observable<any[]> {
    // Replace this with a call to your backend
    const articles = [
      { id: 1, title: 'Article 1', excerpt: 'This is the first article.' },
      { id: 2, title: 'Article 2', excerpt: 'This is the second article.' },
      // Add more articles as needed
    ];
    return of(articles);
  }
  getArticle(id: number): Observable<any> {
    // Replace this with a call to your backend
    const article = { id, title: `Article ${id}`, content: `This is the content of article ${id}.` };
    return of(article);
  }
  
}
