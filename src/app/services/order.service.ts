import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // private baseUrl: string = 'https://localhost:7296/api/Orders';
  private baseUrl: string = `${environment.apiUrl}/Orders`;

  constructor(private http: HttpClient) {}
  
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => error);
  }
  saveOrder(orderObj: any) : Observable<any>{
    console.log(orderObj);
    return this.http.post<any>(`${this.baseUrl}/place`, orderObj).pipe(
      catchError(this.handleError)
    );
  }

  // getOrders(userId: any): Observable<any> {
  //   console.log(userId);
  //   return this.http.get<any>(`${this.baseUrl}/${userId}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  getOrders(userId: any, pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`, {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
      },
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  getTopProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/topproducts`).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentMonth(): number {
    return new Date().getMonth() + 1;
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
