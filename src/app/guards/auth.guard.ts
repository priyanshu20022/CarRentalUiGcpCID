import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toastr.error('Please Login First!');
      this.router.navigate(['login']);
      return false;
    }
  }
}
