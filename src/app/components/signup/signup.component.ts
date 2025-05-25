import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = '';
  password = '';
  confirmPassword = '';
  age: number | null = null;
  errorMessage = '';
  loading = false;

  constructor(private router: Router, private authService : AuthService) {}

  onSignup() {
    this.errorMessage = '';
    this.loading = true;

    
      this.loading = false;

      if (!this.email || !this.password || !this.confirmPassword || this.age === null) {
        this.errorMessage = 'All fields are required.';
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      this.authService.signup(this.email, this.password, this.age).subscribe(
        (res) => {
          // Handle successful signup
          console.log('Signup successful:', res);
          this.waitForAuthAndNavigate();

        },
        (error) => {
          // Handle signup error
        }
      );
  }
  waitForAuthAndNavigate() {
    const interval = setInterval(() => {
      if (this.authService.isAuthenticated()) {
        clearInterval(interval);
        this.router.navigate(['/']);
      }
    }, 200); // check every 200ms
  }
}
