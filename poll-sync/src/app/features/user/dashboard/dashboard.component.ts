import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../core/services/shared/shared.service';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';
import { IUserWithId } from '../../../core/interfaces/user/user.interface';
import { IPollWithID } from '../../../core/interfaces/poll/poll.interface';
import { PollService } from '../../../core/services/poll/poll.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user!: IUserWithId;
  polls: IPollWithID[] = [];
  parentList: IPollWithID[] = [];
  totalActivePolls: number = 0;
  totalUsers: number = 0;
  unauthorized: boolean = true;

  constructor(
    private pollService: PollService,
    private userServices: UserService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userServices.getCurrentUser().subscribe((res: any) => {
      this.user = res.user;
    });
    this.pollService.getPollByUserId().subscribe((res: any) => {
      this.polls = res.polls;
      this.parentList = res.polls
    });
    this.userServices.countTotalUsers().subscribe((res: any) => {
      this.totalUsers = res.totalUsers;
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  countActivePolls() {
    return this.parentList.filter(p => p.isActive).length;
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  handleAction(action: string, pollId: string) {
    alert(`${action} action for poll ${pollId}`);
  }
  logout() {
    localStorage.removeItem('token');
    this.unauthorized = false;
    this.sharedService.triggerNavbarRefresh();
    this.router.navigate(['/auth/login']);
  }

  updateStatus(pid: string, isActive: boolean) {
    this.pollService.updatePollStatus(pid, isActive).subscribe((res: any) => {
      // Find the poll in the polls array and update its isActive status
      const poll = this.polls.find(p => p._id === pid);
      if (poll) {
        poll.isActive = isActive;
      }
      
      this.parentList = this.polls
      console.log("updateStatus: ", res);
    });
  }
  deletePoll(pid: string) {
    this.pollService.deletePollById(pid).subscribe((res: any) => {
      // Find the poll in the polls array and update its isActive status
      const p = this.polls
      this.polls = p.filter(p => p._id !== pid);      
      this.parentList = this.polls
      console.log("updateStatus: ", res);
    });
  }
  filterItems(status:string){
    console.log(status)
    if(status =='all'){
      this.polls = this.parentList;
    } else if(status =='true'){
      this.polls = this.parentList.filter(p=> p.isActive == true);
      console.log("true")
    }if(status =='false'){
      this.polls = this.parentList.filter(p=>p.isActive == false);
      
      console.log("false")
    }
  }
}
