import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SalesRecord {
  id: number;
  date: string;
  productName: string;
  revenue: number;
  orders: number;
}
@Injectable({
  providedIn: 'root'
})
export class SalesserviceService {

  private apiUrl = 'http://localhost:8080/api/sales';

  constructor(private http: HttpClient) {}

  getSalesData(): Observable<SalesRecord[]> {
    return this.http.get<SalesRecord[]>(this.apiUrl);
  }
  
}
