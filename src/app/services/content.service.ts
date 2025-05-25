import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = `${environment.apiUrl}/api/content`;
  searchResults = signal<any[]>([]);
  pagination = signal<any>({});
  searchQuery = signal<string>('');
  
  // Search parameters with default values
  searchTitle = signal<boolean>(true);
  searchCast = signal<boolean>(false);
  searchMovies = signal<boolean>(true);
  searchShows = signal<boolean>(true);

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Perform search
  search(query: string, page?: number,category: string = ''): Observable<any> {
    this.searchQuery.set(query);
    const currentParams = this.getSearchParams();
    console.log('Current params:', currentParams);

    let params = new HttpParams().set('q', query);
    if (category) {
      params = params.set('category', category);
    }

    // Handle 'by' parameter
    if (currentParams.title && !currentParams.cast) {
      params = params.set('by', 'title');
    } else if (!currentParams.title && currentParams.cast) {
      params = params.set('by', 'cast');
    }

    // Handle 'type' parameter
    if (currentParams.movies && !currentParams.shows) {
      params = params.set('type', 'Movie');
    } else if (!currentParams.movies && currentParams.shows) {
      params = params.set('type', 'TV Show');
    }

    if (page) {
      params = params.set('page', page.toString());
    }

    console.log('Final URL:', `${this.apiUrl}/search?${params.toString()}`);

    const headers = { 'Authorization': `Bearer ${this.authService.getToken()}` };
    return this.http.get(`${this.apiUrl}/search`, { params, headers }).pipe(
      tap((results: any) => {
        this.searchResults.set(results.data);
        this.pagination.set(results.pagination);
      }),
      catchError(error => {
        console.error('Search error:', error);
        return error;
      })
    );
  }

  // Update search parameters
  toggleSearchTitle(): void {
    this.searchTitle.update(current => !current);
  }

  toggleSearchCast(): void {
    this.searchCast.update(current => !current);
  }

  toggleSearchMovies(): void {
    this.searchMovies.update(current => !current);
  }

  toggleSearchShows(): void {
    this.searchShows.update(current => !current);
  }

  // Get current search parameters
  getSearchParams() {
    return {
      title: this.searchTitle(),
      cast: this.searchCast(),
      movies: this.searchMovies(),
      shows: this.searchShows()
    };
  }
}