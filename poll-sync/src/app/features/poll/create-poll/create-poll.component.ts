import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IPollOption, IPollWithID, IVote } from '../../../core/interfaces/poll/poll.interface';
import { PollService } from '../../../core/services/poll/poll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css'],
  standalone: false,
})
export class CreatePollComponent {
  @Output() pollCreated = new EventEmitter<IPollWithID>();
  pollCreationForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private pollService: PollService) {
    this.pollCreationForm = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array(
        [
          this.fb.control('', Validators.required),
          this.fb.control('', Validators.required),
        ],
        { validators: Validators.minLength(2) }
      ),
    });
  }

  get options() {
    return this.pollCreationForm.get('options') as FormArray;
  }

  addOption() {
    this.options.push(this.fb.control('', Validators.required));
  }

  removeOption(index: number) {
    if (this.options.length > 2) {
      this.options.removeAt(index);
    }
  }

  onSubmit() {
    if (this.pollCreationForm.valid) {
      console.log('Valid form submission', this.pollCreationForm.value);
      // Handle successful submission

      const { question, options} = this.pollCreationForm.value as {
        question: string;
        options:string[] ;
      };
      
      var optionList: IPollOption[] = [];
      options.forEach(text => {
        optionList.push({optionText:text, voteCount:0})       
      });
      
      this.pollService.addPoll({
        question,
        options:optionList,
        votes: [],
        isActive: true,
        createdBy: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .subscribe((resp)=>{
        // this.pollCreated.emit(resp)
        
        this.router.navigate(['/user/dashboard'])
      })
    } else {
      this.pollCreationForm.markAllAsTouched();
    }
  }
}

// export interface IPoll {
//   question: string;
//   options: IPollOption[];
//   votes: IVote[];
//   isActive:boolean;
//   createdBy: string;
//   createdAt: Date;
//   updatedAt: Date;
// }