import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';
import { SharedModule } from "../../shared/shared.module";
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '../../core/interceptors/token.interceptor';



@NgModule({
  declarations: [
    HomeWrapperComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
],
  exports:[HomeWrapperComponent],
  providers:[provideHttpClient(withInterceptors([tokenInterceptor])),]
})
export class HomeModule { }
