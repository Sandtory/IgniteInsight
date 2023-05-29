import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from '../admin.module'; 
import { ArticleService } from 'src/app/articles/article.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  articleForm: FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
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
        },
        error => {
          console.log('Error creating article', error);
          window.alert('Error creating article. Please try again.');
        }
      );
    }
  }
  
  

  ngOnInit() {
    
  }
}



