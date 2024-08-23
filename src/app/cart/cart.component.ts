import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../services/order.service';
import { ProductsService } from '../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  tokenPayload: any;
  id: any;
  productDetails: any;
  public products: any = [];
  selectedProduct: any = null;
  newStartDate: string = '';
  newEndDate: string = '';

  constructor(
    private cartApi: CartService,
    private authApi: AuthService,
    private toastr: ToastrService,
    private orderApi: OrderService,
    private productApi: ProductsService
  ) {}
  ngOnInit() {
    this.tokenPayload = this.authApi.decodedToken();
    this.id = this.tokenPayload.UserId;
    console.log(this.id);

    this.cartApi.getCartItems(this.id).subscribe((res) => {
      console.log(res);
      this.products = res;
      console.log(this.products);
    });
  }

  calculateRentalDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference + 1; // Add 1 to include the start date as well
  }
  
  isEndDateValid(endDate: string): boolean {
    const currentDate = new Date();
    const productEndDate = new Date(endDate);

    return productEndDate > currentDate;
  }
  isStartDateGreaterThanCurrentDate(startDate: string): boolean {
    const currentDate = new Date();
    const productStartDate = new Date(startDate);
  
    return productStartDate > currentDate;
  }
  
  requestReturn(product: any) {
    product.returnRequested = 1;

    this.cartApi.updateCartItem(product).subscribe(
      (response) => {
        this.toastr.success('Return request sent successfully');
      },
      (error) => {
        console.error('Failed to update cart item:', error);
      }
    );
  }

  loadCartItems() {
    this.cartApi.getCartItems(this.id).subscribe(
      (res) => {
        console.log(res);
        this.products = res;
      },
      (error) => {
        console.error('Failed to fetch cart items:', error);
      }
    );
  }

  updateCartItem(product: any) {
    this.cartApi.updateCartItem(product).subscribe(
      (response) => {
        this.toastr.success('Car booked successfully');
        this.loadCartItems();
      },
      (error) => {
        console.error('Failed to update car:', error);
      }
    );
  }

  deleteCartItem(cartId: any) {
    console.log(cartId);
    this.cartApi.deleteCartItem(cartId).subscribe(
      (response) => {
        this.toastr.success('Car booking has been canceled successfully');
        this.loadCartItems();
      },
      (error) => {
        console.error('Failed to cancel car booking:', error);
      }
    );
  }
}
