import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJWT } from '../../interfaces/JWT/jwt.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendURL='http://localhost:4201/auth/login';
  constructor(private http:HttpClient) {}

  login(eml:string,pass:string){
    return this.http.post<IJWT>(this.backendURL, {email:eml,password:pass})
  }
}
