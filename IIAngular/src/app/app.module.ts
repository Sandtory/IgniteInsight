import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticlesModule } from './articles/articles.module';
import { SubscribeModalComponent } from './subscribe-modal/subscribe-modal.component';
import { FooterComponent } from './footer/footer.component';
import { ThemeService } from './services/theme.service';






const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'admin', component: AdminComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SubscribeModalComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule,
    ArticlesModule,
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

