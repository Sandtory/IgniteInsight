import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/articles`).pipe(
      catchError((error) => {
        console.error('Error fetching articles', error);
        return of([]);
      })
    );
  }

  getTopArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/articles/top`).pipe(
      catchError((error) => {
        console.error('Error fetching top articles', error);
        return of([]);
      })
    );
  }

  getArticle(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/articles/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching articles', error);
        return of([]);
      })
    );
  }

  createArticle(article: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/articles`, article);
  }

  searchArticles(q: string): Observable<any[]> {
    console.log(q)
    return this.http.get<any[]>(`${this.apiUrl}/articles/search?q=${q}`);
  }
}
