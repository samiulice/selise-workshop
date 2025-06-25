import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private navbarRefresh$ = new Subject<void>();

  getNavbarRefreshObservable() {
    return this.navbarRefresh$.asObservable();
  }

  triggerNavbarRefresh() {
    this.navbarRefresh$.next();
  }
}
