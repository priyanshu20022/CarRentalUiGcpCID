import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // private baseUrl: string = 'https://localhost:7296/api/Product';
  private baseUrl: string = `${environment.apiUrl}/Product`;

  constructor(private http: HttpClient) {}
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => error);
  }
  getProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }
  getProductById(productId: any): Observable<any>  {
    console.log(productId);
    return this.http.get<any>(`${this.baseUrl}/${productId}`).pipe(
      catchError(this.handleError)
    );
  }
  createProduct(createObj: any): Observable<any>  {
    console.log(createObj);
    return this.http.post<any>(`${this.baseUrl}/create`, createObj).pipe(
      catchError(this.handleError)
    );
  }
  updateProduct(updatedProduct: any) : Observable<any> {
    console.log(updatedProduct.id);
    return this.http.put<any>(
      `${this.baseUrl}/update/${updatedProduct.id}`,
      updatedProduct
    ).pipe(
      catchError(this.handleError)
    );
  }
  deleteProduct(deleteProduct: any) : Observable<any> {
    console.log(deleteProduct.id);
    return this.http.delete<any>(`${this.baseUrl}/delete/${deleteProduct.id}`, {
      body: deleteProduct,
    }).pipe(
      catchError(this.handleError)
    );
  }
}
