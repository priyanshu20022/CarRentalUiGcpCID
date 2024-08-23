import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  id: any;
  tokenPayload: any;
  public products: any = [];
  public pageNumber: number = 1;
  public pageSize: number = 4;
  public totalItems: number = 0; // This can be updated if you have total count info
  public totalPages: number = 0;

  constructor(private orderApi: OrderService, private authApi: AuthService) {}
  ngOnInit() {
    this.tokenPayload = this.authApi.decodedToken();
    this.id = this.tokenPayload.UserId;
    this.loadOrders();
  }

  loadOrders() {
    this.orderApi.getOrders(this.id, this.pageNumber, this.pageSize).subscribe((res) => {
      console.log(res)
      this.products = res.items;
      console.log(this.products)
      this.totalItems = res.totalItems;
      console.log(this.totalItems)
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    });
  }

  onPageChange(page: number) {
    this.pageNumber = page;
    this.loadOrders();
  }

  get isLastPage(): boolean {
    return this.pageNumber >= this.totalPages;
  }
}
