import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  public productForm!: FormGroup;
  public categories: any = [];
  formData = new FormData();
  constructor(
    private fb: FormBuilder,
    private api: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
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
      imageUrl: ['', Validators.required],
    });
    this.categoryApi.getLocations().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });
  }

  validateFileExtension(file: string | undefined) {
    if (file === 'jpg' || file === 'png' || file === 'jpeg') return true;
    else return false;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedFileTypes = ['image/png', 'image/jpeg'];

    if (file && allowedFileTypes.includes(file.type)) {
      this.productForm.patchValue({ imageUrl: file });
    } else {
      event.target.value = null;
      this.toastr.error('Please select a PNG or JPG image file.');
    }
  }

  onCreate() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);

      const formData = new FormData();
      formData.append('name', this.productForm.get('name')!.value);
      formData.append(
        'description',
        this.productForm.get('description')!.value
      );
      formData.append('price', this.productForm.get('price')!.value);
      formData.append('imageUrl', this.productForm.get('imageUrl')!.value);

      this.api.createProduct(formData).subscribe({
        next: (res) => {
          this.toastr.success('Car created successfully');
          this.productForm.reset();
          this.router.navigate(['product']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
