import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userStore: UserStoreService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();
          console.log(res.token);
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodedToken();
          console.log(tokenPayload);
          this.userStore.setNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.userStore.storeId(tokenPayload.UserId);
          console.log(tokenPayload.UserId);

          this.auth.checkLoginStatus();

          this.toastr.success(res.message);
          this.router.navigate(['']);
        },
        error: (err) => {
          this.toastr.error(err?.error.message);
        },
      });
    } else {
      console.log('not valid');
    }
  }
}
