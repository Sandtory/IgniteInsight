import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from '../admin.module'; 
import { ArticleService } from 'src/app/articles/article.service';
import { Router } from '@angular/router';
import  * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ThemeService } from 'src/app/shared/services/theme.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  darkMode = false;
  public Editor = ClassicEditor;
  articleForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private articleService: ArticleService,
    private router: Router,
    private themeService: ThemeService,
    ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', Validators.required],
      imageUrl: [''],
      tags: ['']
    });
  }
  onSubmit() {
    if (this.articleForm.valid) {
      const article = this.articleForm.value;
      this.articleService.createArticle(article).subscribe(
        () => {
          console.log('Article created');
          window.alert('Article created successfully!');
          this.router.navigate(['/']);  // Navigate to homepage
        },
        error => {
          console.log('Error creating article', error);
          window.alert('Error creating article. Please try again.');
        }
      );
    }
  }
  
  

  ngOnInit() {
    this.themeService.isDarkTheme.subscribe(darkMode => {
      this.darkMode = darkMode;
    });
  }
}



