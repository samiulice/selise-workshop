import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SharedModule } from "../../shared/shared.module";
import { tokenInterceptor } from '../../core/interceptors/token.interceptor';

var routes:Routes=[
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegistrationComponent
  },
]

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  providers:[provideHttpClient(withInterceptors([tokenInterceptor])),],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
]
})
export class AuthModule { }
