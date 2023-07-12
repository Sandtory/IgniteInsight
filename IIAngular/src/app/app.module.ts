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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticlesModule } from './articles/articles.module';
import { SubscribeModalComponent } from './modal/subscribe-modal/subscribe-modal.component';
import { FooterComponent } from './footer/footer.component';
import { LoginRegisterModalComponent } from './modal/login-register-modal/login-register-modal.component';
import { LoginComponent } from './authentication/login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment'; 
import { ThemeService } from './shared/services/theme.service';
import { AuthService } from './shared/services/auth.service';
import { RegisterComponent } from './authentication/register/register.component';







const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SubscribeModalComponent,
    FooterComponent,
    LoginRegisterModalComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes,{ scrollPositionRestoration: 'top' }),
    NgbModule,
    ReactiveFormsModule,
    ArticlesModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [ThemeService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

