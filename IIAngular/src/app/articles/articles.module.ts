import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';



@NgModule({
  declarations: [ArticleListComponent, ArticleDetailComponent],
  imports: [
    CommonModule
  ]
})
export class ArticlesModule { }
