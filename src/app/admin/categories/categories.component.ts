import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public categories: any = [];

  constructor(
    private api: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.api.getLocations().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });
  }

  onEdit(category: any) {
    console.log(category.name);
    const currentRoute = this.router.url;
    const createRoute = currentRoute + '/edit/' + category.id;
    console.log(createRoute);
    this.router.navigate([createRoute], {
      queryParams: {
        id: category.id,
        name: category.name,
      },
    });
  }

  onDelete(category: any) {
    if (category != null)
      this.api.deleteLocation(category).subscribe(
        (response) => {
          console.log('Location deleted successfully');
          this.toastr.success('Location deleted successfully');
          this.categories = this.categories.filter(
            (c: any) => c.id !== category.id
          );
        },
        (error) => {
          this.toastr.error(error?.error.message);
          console.error('Failed to delete location:', error);
        }
      );
  }
}
