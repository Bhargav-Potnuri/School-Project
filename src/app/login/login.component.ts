import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  errorMessage: string = '';
  private loginSubscription: Subscription | undefined;
  showError: boolean = false;
  storeResponse: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.createLoginForm();
  }

  ngOnDestroy() {
    // Unsubscribe from the login subscription when component is destroyed
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  createLoginForm() {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.loginSubscription = this.authService
        .login(username, password)
        .subscribe({
          next: (response: any) => {
            // Store the response or do whatever is needed on success
            console.log('Login successful:', response);
            this.userService.setBranchDetails(
              response.branch_name,
              response.branch_number
            );

            this.router.navigate(['/home']);
          },
          error: (error: any) => {
            // Handle error response (401 Unauthorized)
            console.log('Login failed:', error);
            if (error.status === 401) {
              this.showError = true;
              this.errorMessage = 'Invalid username or password';
            } else {
              this.showError = true;
              this.errorMessage = 'An error occurred. Please try again later.';
            }
          },
        });
    }
  }

  isFieldInvalid(field: string) {
    const control = this.loginForm.get(field);
    return control ? control.invalid && control.touched : false;
  }
}
