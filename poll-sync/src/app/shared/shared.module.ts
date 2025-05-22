import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:'',
      component: NavbarComponent
    }]),
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
