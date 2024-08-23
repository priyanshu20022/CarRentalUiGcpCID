import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public signUpForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]{10}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).*$'),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }
  onSignUp() {
    if (this.signUpForm.valid) {
      if (
        this.signUpForm.value.password !== this.signUpForm.value.confirmPassword
      ) {
        this.toastr.error('Password and Confirm Password do not match.');
        return;
      }

      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err?.error.message);
        },
      });
      console.log(this.signUpForm.value);
    } else {
      console.log('not valid');
    }
  }
}
