import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeWrapperComponent } from './features/home/home-wrapper/home-wrapper.component';
const routes: Routes = [
  {
    path:'', component:HomeWrapperComponent
  },
  {
    path:'polls',
    loadChildren:() => import('./features/poll/poll.module').then(m =>(m.PollModule))
  },
  {
    path:'auth',
    loadChildren:() => import('./features/auth/auth.module').then(m =>(m.AuthModule))
  },
  {
    path:'user',
    loadChildren:()=> import('./features/user/user.module').then(m=>(m.UserModule))
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
