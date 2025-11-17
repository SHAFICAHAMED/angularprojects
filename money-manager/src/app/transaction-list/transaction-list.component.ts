import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  imports: [],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
 transactions = [
    { description: 'Salary', amount: 8000, type: 'income' },
    { description: 'Food', amount: 1000, type: 'expense' },
    { description: 'Electric Bill', amount: 500, type: 'expense' }
  ];
}