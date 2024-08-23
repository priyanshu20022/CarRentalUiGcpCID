import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private baseUrl: string = 'https://localhost:7296/api/Account';
  private baseUrl: string = `${environment.apiUrl}/Account`;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }

  // getUserInfoById(userId: any) {
  //   console.log(userId);
  //   return this.http.get<any>(`${this.baseUrl}/${userId}`);
  // }
}
