import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/shared/shared.service';

@Component({
 selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router, private SharedService:SharedService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.SharedService.triggerNavbarRefresh()
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted', this.loginForm.value);
      const{email, password}=this.loginForm.value as{
        email:string,
        password:string
      }
    this.authService.login(email, password).subscribe({
      next: (res) => {
        if (res.error) {
          alert(res.message || "Unable to login. Please try again");
          this.router.navigate(['/login']); // Redirect on error
        } else {
          console.log(res);
          localStorage.setItem("token", res.token); // Set token to local storage
          this.SharedService.triggerNavbarRefresh();
          this.router.navigate(['user/dashboard']);
        }
      },
      error: (err) => {
        // Handle HTTP/network errors
        alert(err?.error?.message || 'An error occurred during login');
      }
    });
    }
  }
}