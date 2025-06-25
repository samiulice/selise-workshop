import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [],
   providers: [provideHttpClient()],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
