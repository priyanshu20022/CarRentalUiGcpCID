import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public categoryForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onCreate() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      this.api.createLocation(this.categoryForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.categoryForm.reset();
          this.router.navigate(['category']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err?.error.message);
        },
      });
    }
  }
}
