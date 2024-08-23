import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  public categoryForm!: FormGroup;
  public categoryId!: string;

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

    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.categoryId = params['id'];
        this.categoryForm.controls['name'].setValue(params['name']);
      }
    });
  }

  onUpdate() {
    if (this.categoryForm.valid) {
      const updatedCategory = {
        id: this.categoryId,
        name: this.categoryForm.value.name,
      };
      console.log(updatedCategory);
      this.api.updateLocation(updatedCategory).subscribe(
        (response) => {
          console.log('Location updated successfully');
          this.toastr.success('Location updated successfully');
          this.router.navigate(['/category']);
        },
        (error) => {
          this.toastr.error('Failed to update location');
          console.error('Failed to update location:', error);
        }
      );
    }
  }
}
