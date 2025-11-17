import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-transaction',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent {
description = '';
  amount = 0;
  type = 'income';

  constructor(private router: Router) {}

  addTransaction() {
    console.log('Transaction added:', {
      description: this.description,
      amount: this.amount,
      type: this.type
    });
    alert('Transaction added successfully!');
    this.router.navigate(['/']);
  }
}