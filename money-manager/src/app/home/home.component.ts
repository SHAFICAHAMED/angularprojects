import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 balance = 5000;
  income = 8000;
  expense = 3000;

  constructor(private router: Router) {}

  goToAdd() {
    this.router.navigate(['/add']);
  }

  goToList() {
    this.router.navigate(['/list']);
  }
}