import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserWithId } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendURL = 'http://localhost:4201/user';
  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get<IUserWithId>(this.backendURL+'/list');
  }
  countTotalUsers() {
    return this.http.get<any>(`${this.backendURL}/count/all`);
  }
  addUser(user: IUser) {
    return this.http.post<IUserWithId>(this.backendURL+'/create', user);
  }
  getCurrentUser() {
    return this.http.get<IUserWithId>(`${this.backendURL}/get/current`);
  }
    // TODO::
  updateUser(user: IUserWithId) {
    return this.http.put<IUserWithId>(`${this.backendURL}/${user._id}`, user);
  }
}
