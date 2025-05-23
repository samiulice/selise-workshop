import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent  {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
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
    } else {
      // Mark all fields as touched to trigger validation
      Object.keys(this.registrationForm.controls).forEach(field => {
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

  get passwordRequirements(): { requirement: string, met: boolean }[] {
    const password = this.registrationForm.get('password')?.value || '';
    
    return [
      { 
        requirement: 'At least 8 characters long', 
        met: password.length >= 8 
      },
      { 
        requirement: 'Contains at least one uppercase letter', 
        met: /[A-Z]/.test(password) 
      },
      { 
        requirement: 'Contains at least one lowercase letter', 
        met: /[a-z]/.test(password) 
      },
      { 
        requirement: 'Contains at least one number', 
        met: /\d/.test(password) 
      },
      { 
        requirement: 'Contains at least one special character', 
        met: /[@$!%*?&]/.test(password) 
      }
    ];
  }
}
