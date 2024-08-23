import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl: string = `${environment.apiUrl}/Cart/`;

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => error);
  }

  getAllCartProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  addToCart(cartObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}add`, cartObj).pipe(
      catchError(this.handleError)
    );
  }

  getCartItems(customerId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${customerId}`).pipe(
      catchError(this.handleError)
    );
  }

  getcartItem(cartId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}cartitem/${cartId}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteCartItem(cartId: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}delete/${cartId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateCartItem(cartObj: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}update/${cartObj.id}`, cartObj).pipe(
      catchError(this.handleError)
    );
  }
}
