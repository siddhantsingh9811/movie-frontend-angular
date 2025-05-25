import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-categories',
  imports: [CommonModule,RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  query = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query') || '';
      // TODO: fetch and display movies based on this.query
      console.log(this.query)
    });
  }
}
