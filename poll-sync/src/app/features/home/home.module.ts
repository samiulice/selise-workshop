import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [
    HomeWrapperComponent
  ],
  imports: [
    CommonModule,
    SharedModule
],
  exports:[HomeWrapperComponent]
})
export class HomeModule { }
