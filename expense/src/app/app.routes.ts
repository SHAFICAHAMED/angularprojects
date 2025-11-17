import { Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';


export const routes: Routes = [
    { path: '', redirectTo: 'expenses', pathMatch: 'full' },
    { path: 'expenses', component: ExpenseListComponent },
    { path: 'add-expense', component: AddExpenseComponent },
    { path: 'update-expense/:id', component: UpdateExpenseComponent }
  ];