import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private apiUrl = "http://localhost:8080/users"; // ✅ Ensure your backend matches this

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  registerUser(user: any): Observable<any> {``
    return this.http.post(`${this.apiUrl}/register`, user); // ✅ Ensure your backend has this route
  }
  loginUser(user:any):Observable<any>
  {
    return this.http.post(`${this.apiUrl}/login`, user, { responseType: 'text' });
  }
  getByUserName(username:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/find?username=${username}`);
  }
  updateUser(user:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/update/${user.id}`,user);

  }
  deleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }
}
