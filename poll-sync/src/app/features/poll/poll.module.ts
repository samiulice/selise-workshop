import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ActivePollsComponent } from './active-polls/active-polls.component';
import { InactivePollsComponent } from './inactive-polls/inactive-polls.component';
import { RouterModule, Routes } from '@angular/router';

var routes: Routes = [
  {
    path: 'create',
    component: CreatePollComponent,
  },
  {
    path: 'list/active',
    component: ActivePollsComponent,
  },
  {
    path: 'list/inactive',
    component: InactivePollsComponent,
  },
];

@NgModule({
  declarations: [
    CreatePollComponent,
    ActivePollsComponent,
    InactivePollsComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PollModule {}
