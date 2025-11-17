import { Component, OnInit } from '@angular/core';
import { Expense, ExpenseService } from '../expense.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-list',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit{
  expenses:Expense[]=[]
  constructor(private expenseservice:ExpenseService){}
  ngOnInit(): void {
      this.loadExpense()
  }
  loadExpense(){
    this.expenseservice.getExpenses().subscribe (
      data=>this.expenses= data,
      error=>console.error(error) 
    );
  }
  deleteExpense(id:number):void{
      this.expenseservice.deleteExpense(id).subscribe(
        ()=>this.loadExpense(),
        error=>console.error(error)
      )
  }
}
