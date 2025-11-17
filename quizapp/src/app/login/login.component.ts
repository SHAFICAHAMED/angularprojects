import { Component } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = { username: '', password: '' };
  message = '';

  constructor(private userService: UserserviceService, private router: Router) {}

  login() {
    this.userService.loginUser(this.user).subscribe({
      next: (response) => {
        this.message = response;
        alert('Login successful');
        sessionStorage.setItem('loggedIn', 'true');
        this.router.navigate(['/questions']);
      },
      error: (err) => (this.message = err.error)
    });
  }
}