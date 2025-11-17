import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true, // ✅ Standalone component
  imports: [FormsModule, CommonModule], // ✅ Import forms module correctly
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // ✅ Fixed styleUrl to styleUrls (array format)
})
export class RegisterComponent {
  user = { username: '', password: '', role: "USER" };

  constructor(private userservice: UserserviceService,private router:Router) {}

  registerUser() {
    console.log("Registering user:", this.user);

    this.userservice.registerUser(this.user).subscribe(
      response => {
        console.log("Register successfully", response);
      },
      error => {
        console.error("Error registering user", error); // ✅ Added error handling
      }
      
    );
    this.router.navigate(['/login']);
  }
}
