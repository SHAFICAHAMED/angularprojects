import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private apiServerUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<string> {
    return this.http.post(`${this.apiServerUrl}/register`, user, { responseType: 'text' });
  }

  loginUser(user: any): Observable<string> {
    return this.http.post(`${this.apiServerUrl}/login`, user, { responseType: 'text' });
  }
}