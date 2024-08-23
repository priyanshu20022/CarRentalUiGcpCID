import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  public products: any = [];

  constructor(
    private api: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private productDataService: SharedService
  ) {}
  ngOnInit() {
    this.api.getProducts().subscribe((res) => {
      console.log(res);
      this.products = res;
    });
  }

  onEdit(product: any) {
    console.log(product.name);
    this.productDataService.product = product;
    const currentRoute = this.router.url;
    const editRoute = currentRoute + '/edit/' + product.id;
    console.log(editRoute);
    this.router.navigate([editRoute]);
  }

  private updateCartItemsAfterDelete(cartId: any) {
    const index = this.products.findIndex(
      (product: any) => product.cartItemId === cartId
    );
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  onDelete(product: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this car!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteProduct(product).subscribe(
          (response) => {
            console.log('Car deleted successfully');
            const index = this.products.indexOf(product);
            if (index !== -1) {
              this.products.splice(index, 1);
            }
          },
          (error) => {
            console.error('Failed to delete car:', error);
          }
        );
        Swal.fire('Deleted!', 'The car has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The car is safe :)', 'error');
      }
    });
  }
}
