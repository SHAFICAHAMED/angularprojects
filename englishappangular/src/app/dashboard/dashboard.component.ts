import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VocabularyComponent } from "../vocabulary/vocabulary.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, VocabularyComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: any = null;  // Stores logged-in user details
  users: any[] = []; // Stores all registered users

  isEditing:boolean=false
  constructor(private router: Router, private userservice: UserserviceService) {}

  ngOnInit(): void {
    const username = localStorage.getItem('loggedInUser');
    if (!username) {
      this.router.navigate(['/login']);
      return;
    }

    // Fetch the logged-in user's details
    this.userservice.getByUserName(username).subscribe(
      (response) => this.user = response,
      (error) => console.error('Error fetching user details', error)
    );

    // Fetch all registered users
    this.loadUsers();
  }

  loadUsers() {
    this.userservice.getAllUsers().subscribe(
      (response) => this.users = response,
      (error) => console.error('Error fetching users', error)
    );
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
  toggleEdit(){
    this.isEditing=!this.isEditing
  }
  updateUser(){
    this.userservice.updateUser(this.user).subscribe(response=>{
      console.log("update successfully",response);
      this.isEditing=false
    },
  (error)=>console.error("update error",error));
  }

  deleteUser() {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone!")) {
      this.userservice.deleteUser(this.user.id).subscribe(
        () => {
          console.log("User deleted successfully");
          localStorage.removeItem('loggedInUser');
          this.router.navigate(['/register']);
        },
        (error) => console.error("Error deleting user", error)
      );
    }
  }
  
}
