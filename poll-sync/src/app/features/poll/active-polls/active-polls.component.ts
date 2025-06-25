import { Component, numberAttribute } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPollWithID } from '../../../core/interfaces/poll/poll.interface';
import { PollService } from '../../../core/services/poll/poll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-polls',
  standalone: false,
  templateUrl: './active-polls.component.html',
  styleUrl: './active-polls.component.css',
})
export class ActivePollsComponent {
  activePollList: IPollWithID[] = [];
  userId: string = '';
  votedPollsList: string[] = [];
  constructor(private pollService: PollService, private router: Router) {}
  ngOnInit() {
    this.pollService.getActivePolls().subscribe((res: any) => {
      console.log(res);
      if (res.error === false) {
        this.activePollList = res.polls;
        this.userId = res.userId;
        this.activePollList.forEach((poll) => {
          poll.votes.forEach((vote) => {
            if (vote.userId.includes(this.userId)) {
              this.votedPollsList.push(poll._id);
            }
          });
        });
        console.log(this.votedPollsList);
      } else {
        console.log(res.message);
      }
    });
  }
  voteOnPoll(pid: string, optionText: string) {
    this.pollService.voteOnPoll(pid, optionText).subscribe((res: any) => {
      // Reload the current route
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/polls/list/active']);
      });
      if (res.error == false) {
        // alert(res.message);
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/polls/list/active']);
          });
      }
    });
  }
  isVoted(pid: string): boolean {
    return !this.votedPollsList.includes(pid);
  }
  isEmptyList() {
    return this.activePollList.length === this.votedPollsList.length;
  }
}
