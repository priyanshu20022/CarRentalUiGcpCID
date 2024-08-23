import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent {
  public productForm!: FormGroup;
  public productId!: string;
  public imageUrl: string = '';
  public categories: any = [];

  constructor(
    private fb: FormBuilder,
    private api: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private productDataService: SharedService,
    private categoryApi: CategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-Z0-9 ]+$'),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern('^[a-zA-Z0-9 ]+$'),
        ],
      ],
      price: ['', Validators.required],
      imageUrl: [''],
    });

    const productData = this.productDataService.product;
    console.log(productData);
    if (productData) {
      this.productId = productData.id;
      this.imageUrl = productData.imageUrl;
      this.productForm.patchValue({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        imageUrl: productData.imageUrl,
      });
    }
    this.categoryApi.getLocations().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });
  }

  onUpdate() {
    if (this.productForm.valid) {
      const updatedCategory = {
        id: this.productId,
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        imageUrl: this.imageUrl,
      };
      console.log(updatedCategory);
      this.api.updateProduct(updatedCategory).subscribe(
        (response) => {
          this.toastr.success('Car updated successfully');
          this.router.navigate(['/product']);
        },
        (error) => {
          console.error('Failed to update car:', error);
        }
      );
    }
  }
}
