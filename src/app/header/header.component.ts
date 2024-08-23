import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: any;
  tokenPayload: any;
  loggedInStatus = false;
  public cartItemCount: number = 0;
  constructor(
    public api: AuthService,
    private router: Router,
    public cartService: CartService
  ) {}
  ngOnInit() {
    this.tokenPayload = this.api.decodedToken();
    console.log(this.tokenPayload)
    this.name = this.tokenPayload.unique_name;
    console.log(this.name);
    this.loggedInStatus = !!localStorage.getItem('token');
    this.checkLoginStatus();
  }

  private updateCartItemCount(customerId: any) {
    this.cartService.getCartItems(customerId).subscribe((cartItems: any[]) => {
      this.cartItemCount = cartItems.length;
    });
  }

  checkLoginStatus() {
    this.loggedInStatus = !!localStorage.getItem('token');
  }

  logout() {
    this.api.signOut();
    this.checkLoginStatus();
    this.api.checkLoginStatus();
    this.router.navigate(['/']);
  }
}
