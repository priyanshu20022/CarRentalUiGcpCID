import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { authGuard } from './guards/auth.guard';
import { CategoriesComponent } from './admin/categories/categories.component';
import { CreateComponent } from './admin/categories/create/create.component';
import { EditComponent } from './admin/categories/edit/edit.component';
import { ProductsComponent } from './admin/products/products.component';
import { AddComponent } from './admin/products/add/add.component';
import { UpdateComponent } from './admin/products/update/update.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { adminGuard } from './guards/admin.guard';
import { TopProductsComponent } from './admin/top-products/top-products.component';
import { EditDatesComponent } from './cart/edit-dates/edit-dates.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'category',
    component: CategoriesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'category/create',
    component: CreateComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'category/edit/:id',
    component: EditComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'product',
    component: ProductsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'product/create',
    component: AddComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'product/edit/:id',
    component: UpdateComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-dates/:id', 
    component: EditDatesComponent,
  },
  {
    path: 'myorders',
    component: MyOrdersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'topproducts',
    component: TopProductsComponent,
    canActivate: [adminGuard],
  },
  // {
  //   path: '',
  //   redirectTo: '/product',
  //   pathMatch: 'full',
  //   canActivate: [adminGuard],
  // },
 
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
