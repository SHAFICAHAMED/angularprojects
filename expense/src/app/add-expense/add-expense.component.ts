import { Component } from '@angular/core';
import { Expense, ExpenseService } from '../expense.service';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {
  expense:Expense={
    description:'',
    amount:0,
    category:'',
    date:new Date().toISOString().split('T')[0]
  }
  constructor(private expeneseService:ExpenseService,private router:Router){

  }
addExpense(){
  this.expeneseService.addExpense(this.expense).subscribe(
    ()=>this.router.navigate(['/expenses']),
    error=>console.error(error)
  );
}

}
