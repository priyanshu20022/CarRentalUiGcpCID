import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CategoriesComponent } from './admin/categories/categories.component';
import { CreateComponent } from './admin/categories/create/create.component';
import { EditComponent } from './admin/categories/edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './admin/products/products.component';
import { AddComponent } from './admin/products/add/add.component';
import { UpdateComponent } from './admin/products/update/update.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { TopProductsComponent } from './admin/top-products/top-products.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditDatesComponent } from './cart/edit-dates/edit-dates.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    CreateComponent,
    EditComponent,
    HeaderComponent,
    ProductsComponent,
    AddComponent,
    UpdateComponent,
    HomeComponent,
    DetailsComponent,
    CartComponent,
    MyOrdersComponent,
    TopProductsComponent,
    EditDatesComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
