import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Expense{
  id?:number;
  description:string;
  amount:number;
  category:string;
  date:string;  

}
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiurl="http://localhost:8080/api/expenses";

  constructor(private http:HttpClient) { }
  getExpenses():Observable<Expense[]>{
    return this.http.get<Expense[]>(this.apiurl);
  }
  getExpense(id :number):Observable<Expense>{
    return this.http.get<Expense>(`${this.apiurl}/${id}`)
  }
  addExpense(expense:Expense):Observable<Expense>{
    return this.http.post<Expense>(this.apiurl,expense);
  }
  updateExpense(expense:Expense):Observable<Expense>{
    return this.http.put<Expense>(`${this.apiurl}/${expense.id}`,expense)
  }
  deleteExpense(id:number):Observable<any>{
    return this.http.delete(`${this.apiurl}/${id}`);
  }
}
