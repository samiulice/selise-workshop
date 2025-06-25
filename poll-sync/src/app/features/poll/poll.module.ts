import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ActivePollsComponent } from './active-polls/active-polls.component';
import { InactivePollsComponent } from './inactive-polls/inactive-polls.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { loginGuard } from '../../core/guards/login.guard';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '../../core/interceptors/token.interceptor';

var routes: Routes = [
  {
    path: 'create',
    component: CreatePollComponent,
    canActivate:[loginGuard]
  },
  {
    path: 'list/active',
    component: ActivePollsComponent,
    canActivate:[loginGuard]
  },
  {
    path: 'list/inactive',
    component: InactivePollsComponent,
    canActivate:[loginGuard]
  },
];

@NgModule({
  declarations: [
    CreatePollComponent,
    ActivePollsComponent,
    InactivePollsComponent,
  ],
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
})
export class PollModule {}
