import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPoll, IPollWithID } from '../../interfaces/poll/poll.interface';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private backendURL = 'http://localhost:4201/poll';
  constructor(private http: HttpClient) {}

  getAllPolls() {
    return this.http.get<IPollWithID[]>(this.backendURL + '/list');
  }
  getActivePolls() {
    return this.http.get<IPollWithID[]>(
      this.backendURL + '/list?isActive=true'
    );
  }

  getInactivePolls() {
    return this.http.get<IPollWithID[]>(
      this.backendURL + '/list?isActive=false'
    );
  }

  getPollByUserId() {
    return this.http.get<IPollWithID>(`${this.backendURL}/list/userid`);
  }
  getPollById(pollId: string) {
    return this.http.get<IPollWithID>(`${this.backendURL}/${pollId}`);
  }
  addPoll(poll: IPoll) {
    return this.http.post<IPollWithID>(this.backendURL + '/create', poll);
  }
  updatePollStatus(pid:string, isActive:boolean){
    return this.http.post<any>(`${this.backendURL}/update/status/${pid}/${isActive}`,null);
  }
   
  deletePollById(pid:string) {
    return this.http.post<any>(`${this.backendURL}/delete/${pid}`, null);
  }
  voteOnPoll(pid: string, optionText: string) {
    console.log('Vote Info:', pid, optionText);
    return this.http.post<string>(
      `${this.backendURL}/vote/${pid}/${optionText}`,
      null
    );
  }
}
