import { Component } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  user = { username: '', password: '', role: 'USER' };
  message: string = '';

  constructor(private userService: UserserviceService, private router: Router) {}

  register() {
    this.userService.registerUser(this.user).subscribe({
      next: (response) => {
        this.message = response;
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => (this.message = err.error)
    });
  }
}