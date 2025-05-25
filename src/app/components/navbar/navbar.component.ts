import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { ionSearch, ionOptions } from '@ng-icons/ionicons';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgIcon],
  // REMOVED ContentService from providers to use the root instance
  providers: [provideIcons({ionSearch,ionOptions}), provideNgIconsConfig({ size: '1.5em' })],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private router: Router, 
    private authService: AuthService, 
    private contentService: ContentService
  ) {}

  searchQuery = '';
  searchParams = computed(() => this.contentService.getSearchParams());

  // Modified toggle methods to ensure search triggers after state updates
  toggleTitle() {
    this.contentService.toggleSearchTitle();
    this.triggerSearchIfActive();
  }

  toggleCast() {
    this.contentService.toggleSearchCast();
    this.triggerSearchIfActive();
  }

  toggleMovies() {
    this.contentService.toggleSearchMovies();
    this.triggerSearchIfActive();
  }

  toggleShows() {
    this.contentService.toggleSearchShows();
    this.triggerSearchIfActive();
  }

  private triggerSearchIfActive() {
    // Only trigger search if we're currently on a search results page
    if (this.router.url.includes('/search')) {
      const currentQuery = this.router.url.split('/search/')[1];
      if (currentQuery) {
        setTimeout(() => {
          this.contentService.search(currentQuery).subscribe();
        });
      }
    }
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      console.log(this.contentService.getSearchParams())
      this.router.navigate(['/search', this.searchQuery.trim()]);
      this.searchQuery = '';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}