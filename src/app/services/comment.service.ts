import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  // private baseUrl: string = 'https://localhost:7296/api/Comment';
  private baseUrl: string = `${environment.apiUrl}/Comment`;

  constructor(private http: HttpClient) {}
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => error);
  }
  addComment(comment: any): Observable<any> {
    console.log(comment);
    return this.http.post<any>(`${this.baseUrl}/add`, comment).pipe(
      catchError(this.handleError)
    );
  }

  getComments(productId: any):Observable<any> {
    console.log(productId);
    return this.http.get<any>(`${this.baseUrl}/${productId}`).pipe(
      catchError(this.handleError)
    );
  }
}
