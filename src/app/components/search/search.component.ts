import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { ContentContainerComponent } from '../content-container/content-container.component';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [CommonModule, RouterModule, ContentContainerComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query = '';
  category = '';
  isLoading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    public contentService: ContentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query') || '';
      this.category = params.get('category') || '';
      
      if (this.query || this.category) {
        this.performSearch(this.query, this.category);
      }
    });
    if(this.location.path() == ''){
      console.log("HOME");
      this.performSearch('')
    }

  }

  private performSearch(query: string, category: string = ''): void {
    this.isLoading = true;
    this.error = null;
    
    this.contentService.search(query,1, category).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Failed to load search results';
        console.error(err);
      }
    });
  }

  getAllPages(): number[] {
    const { totalPages } = this.contentService.pagination();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.contentService.pagination().totalPages) {
      this.isLoading = true;
      this.error = null;
      
      this.contentService.search(this.query, page, this.category).subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Failed to load search results';
          console.error(err);
        }
      });
    }
  }
  private maxVisiblePages = 5; // Adjust as needed

  showFirstPage(): boolean {
    const { page, totalPages } = this.contentService.pagination();
    return totalPages > this.maxVisiblePages && page > 2;
  }

  showFirstEllipsis(): boolean {
    const { page, totalPages } = this.contentService.pagination();
    return totalPages > this.maxVisiblePages && page > 3;
  }

  showLastPage(): boolean {
    const { page, totalPages } = this.contentService.pagination();
    return totalPages > this.maxVisiblePages && page < totalPages - 1;
  }

  showLastEllipsis(): boolean {
    const { page, totalPages } = this.contentService.pagination();
    return totalPages > this.maxVisiblePages && page < totalPages - 2;
  }

  getMiddlePages(): number[] {
    const { page, totalPages } = this.contentService.pagination();
    const half = Math.floor(this.maxVisiblePages / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + this.maxVisiblePages - 1);

    if (end - start + 1 < this.maxVisiblePages) {
      start = Math.max(1, end - this.maxVisiblePages + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}