import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from '../admin.module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  articleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.articleForm.valid) {
      const article = this.articleForm.value;
      // Call your ArticleService to save the article
    }
  }

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
      
    });
  }
}



