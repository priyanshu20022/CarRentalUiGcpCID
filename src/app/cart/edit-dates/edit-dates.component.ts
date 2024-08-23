import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-edit-dates',
  templateUrl: './edit-dates.component.html',
  styleUrls: ['./edit-dates.component.css']
})
export class EditDatesComponent {
  @ViewChild('editModal') editModal!: ElementRef;
  cartItemId: any;
public cartProducts: any = [];

public startDate: string='';
  public endDate: string='';

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
private router : Router
  ){}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.cartItemId = +params['id'];
      console.log(this.cartItemId);
    });
    this.cartService.getcartItem(this.cartItemId).subscribe((res) => {
      this.cartProducts = res;
      console.log(this.cartProducts);
    });
  }
  
  selectedProduct: any = null;
  newStartDate: string = '';
  newEndDate: string = '';


closeEditModal() {
  this.editModal.nativeElement.hide();
}
  updateDates() {
    const selectedStartDate = new Date(this.startDate);
    const selectedEndDate = new Date(this.endDate);
  
    for (const product of this.cartProducts) {
      const productStartDate = new Date(product.startDate);
      productStartDate.setHours(0, 0, 0, 0);
      const productEndDate = new Date(product.endDate);
      productEndDate.setHours(0, 0, 0, 0);
      selectedStartDate.setHours(0,0,0,0);
      selectedEndDate.setHours(0,0,0,0);
      if (
        selectedStartDate <= productEndDate &&
        selectedEndDate >= productStartDate
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Date Conflict',
          text: 'This product is not available for the selected dates.',
        });
        return; 
      }
    }
  
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Dates updated successfully!',
    });
  }
  
}

