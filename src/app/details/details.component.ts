import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from '../services/comment.service';
import Swal from 'sweetalert2';
import { CategoriesService } from '../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var window: any;
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  productId: any;
  public isLoading: boolean = true; // Loading state
  product: any;
  id: any;
  tokenPayload: any;
  public comments: any = [];
  author: any;
  newCommentText: string = '';
  isLoggedIn: any;
  public startDate: string = '';
  public endDate: string = '';
  public cartProducts: any = [];
  public locations: any = [];
  bookingForm!: FormGroup;
  selectedPickupLocation: string = '';
  selectedDropLocation: string = '';
  public currentDate: string = '';

  formModal: any;
  constructor(
    private api: ProductsService,
    private route: ActivatedRoute,
    private apiUserData: UserStoreService,
    private authApi: AuthService,
    private router: Router,
    private cartApi: CartService,
    private toastr: ToastrService,
    private commentService: CommentService,
    private locationService: CategoriesService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.currentDate = this.getCurrentDate();

    this.bookingForm = this.formBuilder.group({
      pickupLocation: ['', Validators.required],
      dropLocation: ['', Validators.required],
    });

    this.locationService.getLocations().subscribe((res) => {
      console.log(res);
      this.locations = res;
    });

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );

    this.startDate = localStorage.getItem('startDate') || '';
    this.endDate = localStorage.getItem('endDate') || '';

    this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      console.log(this.productId);
      this.getProductDetails();
    });
    this.api.getProductById(this.productId).subscribe((res) => {
      this.product = res;
      console.log(this.product);
      this.isLoading = false; // Stop loading spinner after data is fetched
    });
    console.log(this, this.productId);
    this.cartApi.getcartItem(this.productId).subscribe((res) => {
      this.cartProducts = res;
      console.log(this.cartProducts);
    });
    console.log(this.cartProducts);
    this.tokenPayload = this.authApi.decodedToken();
    this.id = this.tokenPayload.UserId;
    console.log(this.id);
    this.loadComments();
    this.author = this.tokenPayload.unique_name;
    this.isLoggedIn = this.authApi.isLoggedIn();
  }

  openModal() {
    this.formModal.show();
  }
  closeModal() {
    this.formModal.hide();
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getProductDetails() {
    this.api.getProductById(this.productId).subscribe((product) => {
      this.product = product;
      console.log(product);
    });
  }

  calculateRentalDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference + 1; // Add 1 to include the start date as well
  }

  updateDates() {
    const selectedStartDate = new Date(this.startDate);
    const selectedEndDate = new Date(this.endDate);

    this.selectedPickupLocation = this.bookingForm.value.pickupLocation;
    this.selectedDropLocation = this.bookingForm.value.dropLocation;
    for (const product of this.cartProducts) {
      const productStartDate = new Date(product.startDate);
      productStartDate.setHours(0, 0, 0, 0);
      const productEndDate = new Date(product.endDate);
      productEndDate.setHours(0, 0, 0, 0);
      selectedStartDate.setHours(0, 0, 0, 0);
      selectedEndDate.setHours(0, 0, 0, 0);
      if (
        selectedStartDate <= productEndDate &&
        selectedEndDate >= productStartDate
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Date Conflict',
          text: 'This car is not available for the selected dates.',
        });
        return; 
      }
    }
    this.openModal();
  }

  addToCart() {
    const item = {
      productId: this.product.id,
      customerId: this.id,
      startDate: this.startDate,
      endDate: this.endDate,
      agreementAccepted: 1,
      returnRequested: 0,
      pickUp: this.selectedPickupLocation,
      drop: this.selectedDropLocation,
    };
    console.log(item);
    this.cartApi.addToCart(item).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'Success');
        this.formModal.hide();
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadComments() {
    this.commentService.getComments(this.productId).subscribe((comments) => {
      this.comments = comments;
    });
  }
  filterProducts() {
    if (
      this.startDate &&
      this.endDate &&
      new Date(this.endDate) < new Date(this.startDate)
    ) {
      this.endDate = this.startDate;
    }
  }
  postComment() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const comment = {
      productId: this.productId,
      text: this.newCommentText,
      author: this.author,
      date: formattedDate,
    };

    this.commentService.addComment(comment).subscribe(
      (res) => {
        this.toastr.success('Comment posted successfully', 'Success');
        this.newCommentText = '';
        this.loadComments();
      },
      (error) => {
        this.toastr.error('Failed to post comment', 'Error');
      }
    );
  }
}
