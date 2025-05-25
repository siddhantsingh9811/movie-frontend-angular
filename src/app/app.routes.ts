import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: 'search/:query',
        loadComponent: () => import('./components/search/search.component').then(m => m.SearchComponent)
      },
      {
        path: 'categories/:category',
        // loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent)
        loadComponent: () => import('./components/search/search.component').then(m => m.SearchComponent)

      },
      {
        path: '',
        loadComponent: () => import('./components/search/search.component').then(m => m.SearchComponent)

      }


    ]
  },
  { path: '**', redirectTo: '' }
];
