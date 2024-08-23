import { HttpClient } from '@angular/common/http';
// import { OnInit } from '@angular/core';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private baseUrl: string = 'https://localhost:7296/api/Account/';
  private baseUrl: string = `${environment.apiUrl}/Account/`;
  private userPayload: any;
  loggedInStatus = false;
  tokenPayload: any;
  name: any;
  role: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
    this.loggedInStatus = !!localStorage.getItem('token');
    this.tokenPayload = this.decodedToken();
    if (this.tokenPayload) {
      this.name = this.tokenPayload.unique_name;
      this.role = this.tokenPayload.role;
    }
  }
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => error);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  signUp(userObj: any) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}register`, userObj).pipe(
      catchError(this.handleError)
    );
  }
  login(loginObj: any) : Observable<any> {
    console.log(this.baseUrl)
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj).pipe(
      catchError(this.handleError)
    );
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  isLoggedIn(): boolean {
    console.log(!!localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }

  checkLoginStatus() {
    this.loggedInStatus = !!localStorage.getItem('token');
    this.tokenPayload = this.decodedToken();
    this.name = this.tokenPayload.unique_name;
    console.log("ls", this.name)
    this.role = this.tokenPayload.role;
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getNameFromToken() {
    if (this.userPayload) return this.userPayload.name;
  }

  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }
}
