import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;
  
  constructor(private router: Router, private authService : AuthService) {}

  onLogin() {
    this.errorMessage = '';
    this.loading = true;

    // Simulate API call delay
    console.log(this.email,this.password);
    this.authService.login(this.email, this.password).subscribe(
    (res) => {
      // Handle successful login (e.g., navigate to dashboard)
      console.log('Login successful:', res);
      this.waitForAuthAndNavigate();

    },
    (error) => {
      this.errorMessage = 'Invalid email or password.';
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
