import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public products: any = [];
  public isLoading: boolean = true; // Loading state
  public cartProducts: any = [];
  public categories: any = [];
  public selectedCategory: string = '';
  public filteredProducts: any = [];
  public searchQuery: any;
  public sortBy: string = '';
  public startDate: string = '';
  public endDate: string = '';

  constructor(
    private api: ProductsService,
    private categoryApi: CategoriesService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.startDate = this.getCurrentDate();
    this.endDate = this.getCurrentDate();

    this.api.getProducts().subscribe((res) => {
      console.log(res);
      this.products = res;
      this.filteredProducts = res;
      this.isLoading = false; // Stop loading spinner after data is fetched
      //apply filter
      this.filterProducts();
    });

    this.categoryApi.getLocations().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });

    this.cartService.getAllCartProducts().subscribe((res) => {
      console.log(res);
      this.cartProducts = res;
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  filterProducts() {
    if (
      this.startDate &&
      this.endDate &&
      new Date(this.endDate) < new Date(this.startDate)
    ) {
      this.endDate = this.startDate;
    }
    if (this.selectedCategory && this.searchQuery) {
      this.filteredProducts = this.products.filter(
        (product: any) =>
          product.category === this.selectedCategory &&
          (product.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()))
      );
    } else if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(
        (product: any) => product.category === this.selectedCategory
      );
    } else if (this.searchQuery) {
      this.filteredProducts = this.products.filter(
        (product: any) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }

    if (this.sortBy === 'priceLowToHigh') {
      this.filteredProducts.sort((a: any, b: any) => a.price - b.price);
    } else if (this.sortBy === 'priceHighToLow') {
      this.filteredProducts.sort((a: any, b: any) => b.price - a.price);
    }

    this.cartService.getAllCartProducts().subscribe((cartProducts) => {
      console.log('Cart Products:', cartProducts);
      const overlappingProductIds = new Set<number>();

      for (const cartProduct of cartProducts) {
        const cartStartDate = new Date(cartProduct.startDate);
        cartStartDate.setHours(0, 0, 0, 0);
        const cartEndDate = new Date(cartProduct.endDate);
        cartEndDate.setHours(0, 0, 0, 0);
        const userStartDate = new Date(this.startDate);
        userStartDate.setHours(0, 0, 0, 0);
        const userEndDate = new Date(this.endDate);
        userEndDate.setHours(0, 0, 0, 0);

        if (
          cartProduct.productId &&
          cartStartDate <= userEndDate &&
          cartEndDate >= userStartDate
        ) {
          overlappingProductIds.add(cartProduct.productId);
        }
      }

      this.filteredProducts = this.products.filter((product: any) => {
        return !overlappingProductIds.has(product.id);
      });
      if (this.searchQuery) {
        this.filteredProducts = this.products.filter(
          (product: any) =>
            product.name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
        );
      }
    });

    localStorage.setItem('startDate', this.startDate);
    localStorage.setItem('endDate', this.endDate);
  }
}
