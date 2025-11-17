import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ExpenseListComponent } from "./expense-list/expense-list.component";
import { AddExpenseComponent } from "./add-expense/add-expense.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, ExpenseListComponent, AddExpenseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'expense';
}
