import { Component } from '@angular/core';
import { IPollWithID } from '../../../core/interfaces/poll/poll.interface';
import { PollService } from '../../../core/services/poll/poll.service';

@Component({
  selector: 'app-inactive-polls',
  standalone: false,
  templateUrl: './inactive-polls.component.html',
  styleUrl: './inactive-polls.component.css'
})
export class InactivePollsComponent {
  inActivePollList: IPollWithID[] = [];
  totalPolls:number = 0
  constructor(private pollService: PollService) {}
  ngOnInit() {
    this.pollService.getInactivePolls().subscribe((res:any) => {
      console.log("Fetched list: ", res)
      if (res.error == false){
        this.inActivePollList = res.polls;
      this.totalPolls = this.inActivePollList.length;

      this.inActivePollList.forEach(p=>{
      let totalVotes:number = 0;
      p.options.forEach(opt => {
        totalVotes+= opt.voteCount
      });
      p.options.forEach(opt=>{
        let percentage = 0
        if (totalVotes != 0){
          percentage = Math.round(opt.voteCount*100/totalVotes)
        }  
        opt.percentage = percentage
      })
    })
      }
    });
  }
}
