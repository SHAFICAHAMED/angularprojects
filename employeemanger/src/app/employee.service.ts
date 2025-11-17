import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // private apiServerUrl = 'http://localhost:8080';
  private apiServerUrl='https://demo-deployment-latest-b2xy.onrender.com';

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employees/all`);  // Corrected
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employees/add`, employee);  // Corrected
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employees/update`, employee);  // Corrected
  }

  public deleteEmployee(employeeId: number): Observable<void> {  // Changed parameter type to 'number'
    return this.http.delete<void>(`${this.apiServerUrl}/employees/delete/${employeeId}`);  // Corrected
  }
}
