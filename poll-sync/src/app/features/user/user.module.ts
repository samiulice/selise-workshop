import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from '../../core/guards/login.guard';



var routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[loginGuard]
  },
];
@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class UserModule { }
