import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense, ExpenseService } from '../expense.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-expense',
  imports: [CommonModule,FormsModule],
  templateUrl: './update-expense.component.html',
  styleUrl: './update-expense.component.css'
})
export class UpdateExpenseComponent {
  expense: Expense = {
    description: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0]
  };

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.expenseService.getExpense(id).subscribe(
      data => this.expense = data,
      error => console.error(error)
    );
  }

  updateExpense(): void {
    this.expenseService.updateExpense(this.expense).subscribe(
      () => this.router.navigate(['/expenses']),
      error => console.error(error)
    );
  }
}