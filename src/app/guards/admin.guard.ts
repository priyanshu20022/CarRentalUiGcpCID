import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class adminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (this.auth.isLoggedIn() && this.auth.decodedToken().role == 'Admin') {
      return true;
    } else {
      this.toastr.error('You are not authorised to access that page!');
      this.router.navigate(['']);
      return false;
    }
  }
}
