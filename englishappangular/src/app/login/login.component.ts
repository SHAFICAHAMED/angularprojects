import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user={username:'',password:''}
  constructor(private userservice:UserserviceService,private router:Router){}

  loginUser(){
    this.userservice.loginUser(this.user).subscribe((response) => {
      if (response === "Login successful") {
        localStorage.setItem('loggedInUser', this.user.username);
        this.router.navigate(['/home']);
      } else {
        alert("Invalid credentials");
      }
    },
    (error) => console.error("Login failed", error)
  );
  }
  goToRegister() {
    this.router.navigate(['/register']); // Navigate to register page
  }


}
