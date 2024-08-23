import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // private baseUrl: string = 'https://localhost:7296/api/Location';
  private baseUrl: string = `${environment.apiUrl}/Location`;

  constructor(private http: HttpClient) {}
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => error);
  }
  getLocations() :Observable<any>{
    return this.http.get<any>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }
  createLocation(createObj: any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, createObj).pipe(
      catchError(this.handleError)
    );
  }
  updateLocation(updatedCategory: any) :Observable<any>{
    console.log(updatedCategory.id);
    return this.http.put<any>(
      `${this.baseUrl}/update/${updatedCategory.id}`,
      updatedCategory
    ).pipe(
      catchError(this.handleError)
    );;
  }
  deleteLocation(deleteCategory: any) :Observable<any>{
    console.log(deleteCategory.id);
    return this.http.delete<any>(
      `${this.baseUrl}/delete/${deleteCategory.id}`,
      { body: deleteCategory }
    ).pipe(
      catchError(this.handleError)
    );
  }
}
