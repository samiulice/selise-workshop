import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserService } from '../../../core/services/user/user.service';
import { IUserWithId } from '../../../core/interfaces/user/user.interface';
import { SharedService } from '../../../core/services/shared/shared.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  @Output() userAdded = new EventEmitter<IUserWithId>();
  registrationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.registrationForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Registration form submitted', this.registrationForm.value);
      // Add your registration logic here
      const { fullName, email, password } = this.registrationForm.value as {
        fullName: string;
        email: string;
        password: string;
      };
      this.userService
        .addUser({
          fullName,
          email,
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
          votedPolls: [],
        })
        .subscribe({
          next: (res:any) => {
        if (res.error==true) {
          this.registrationForm.reset()
          alert(res.message || 'Registration failed');
          
          return;
        }
        this.userAdded.emit(res);
        console.log(res);
        this.authService.login(email, password).subscribe((loginRes) => {
          if (loginRes.error == true) {
            alert(loginRes.message);
          } else {
            console.log(loginRes);
            localStorage.setItem('token', loginRes.token); // Set token to local storage
            this.sharedService.triggerNavbarRefresh();
            this.router.navigate(['user/dashboard']);
          }
        });
          },
          error: (err) => {
        // Handle HTTP/network errors
        alert(err?.error?.message || 'An error occurred during registration');
          }
        });
    } else {
      // Mark all fields as touched to trigger validation
      Object.keys(this.registrationForm.controls).forEach((field) => {
        const control = this.registrationForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  // Helper methods for template
  get passwordHasError(): boolean {
    const control = this.registrationForm.get('password');
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  get passwordRequirements(): { requirement: string; met: boolean }[] {
    const password = this.registrationForm.get('password')?.value || '';

    return [
      {
        requirement: 'At least 8 characters long',
        met: password.length >= 8,
      },
      {
        requirement: 'Contains at least one uppercase letter',
        met: /[A-Z]/.test(password),
      },
      {
        requirement: 'Contains at least one lowercase letter',
        met: /[a-z]/.test(password),
      },
      {
        requirement: 'Contains at least one number',
        met: /\d/.test(password),
      },
      {
        requirement: 'Contains at least one special character',
        met: /[@$!%*?&]/.test(password),
      },
    ];
  }
}
