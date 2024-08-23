import { Component, NgZone, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { OrderSignalrService } from 'src/app/services/order-signalr.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.css'],
})
export class TopProductsComponent implements OnInit {
  topProducts: any = [];
  cartProducts: any =[];
  constructor(
    private adminService: OrderService, 
    private cartService : CartService, 
    private toastr: ToastrService,
    private orderService : OrderService,
    private signalRService: OrderSignalrService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone // Inject NgZone
    ) 
    {}

  ngOnInit() {
   
    this.signalRService.startConnection();

    // Listen for incoming orders
    this.signalRService.hubConnection.on('SendUpdatedOrders', (product : any) => {
      this.cartProducts.push(product); // Add the new order to the list
      this.toastr.success('New order placed!', 'New Order');
      console.log("signal r", product)
    });
  
    this.adminService.getTopProducts().subscribe((res) => {
      console.log(res);
      this.topProducts = res;
    });
    this.cartService.getAllCartProducts().subscribe((res) => {
      console.log(res);
      this.cartProducts = res;
    })
  }

  getTopProducts() {
    this.cartService.getAllCartProducts().subscribe((res) => {
      this.cartProducts = res;
    });
  }

  deleteCartItem(cartId: any) {
    console.log(cartId);
    this.cartService.deleteCartItem(cartId).subscribe(
      (response) => {
        this.toastr.success('Booking cancelled successfully');
        this.getTopProducts();
      },
      (error) => {
        console.error('Failed to update car:', error);
      }
    );
  }

  markForInception(product: any) {
    product.markForInception = 1;
    this.cartService.updateCartItem(product).subscribe(
      (response) => {
        this.toastr.success('Marked for inception successfully');
      },
      (error) => {
        console.error('Failed to update car item:', error);
      }
    );
  }

  getCurrentDate(): string{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = (currentDate.getDate()).toString().padStart(2, '0');
    return  `${year}-${month}-${day}`;
  }
  isEndDateLessThanCurrentDate(endDate: string): boolean {
    const currentDate = new Date();
    const productEndDate = new Date(endDate);
    currentDate.setHours(0, 0, 0, 0);

    return productEndDate < currentDate;
  }
  markAsReturned(product: any) {
    this.placeOrder(product);
  }

  placeOrder(product: any) {
    const order = {
      CustomerId : product.customerId,
      Name: product.product.name,
      ImageUrl : product.product.imageUrl,
      Price: product.product.price,
      ProductId: product.product.id,
      StartDate: product.startDate,
      EndDate : product.endDate,
      Pickup: product.pickup,
      Drop : product.drop
    };
    console.log(order);
    console.log(product.drop);
    console.log(product.pickup)
    console.log(product.product.imageUrl)
    console.log(product.product.name)
    this.cartService.deleteCartItem(product.id).subscribe(
      (response) => {
        this.getTopProducts();
      },
      (error) => {
        console.error('Failed to update car:', error);
      }
    );
    this.orderService.saveOrder(order).subscribe(
      (response) => {
        this.toastr.success('Car returned successfully');
      },
      (error) => {
        console.error('Failed to return car:', error);
      }
    );    
  }
}
