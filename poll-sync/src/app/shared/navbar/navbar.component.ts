import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../../core/services/shared/shared.service';
import { UserService } from '../../core/services/user/user.service';
import { IUserWithId } from '../../core/interfaces/user/user.interface';
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  refreshSub!: Subscription;
  unauthorized: boolean = localStorage.getItem('token') == null;
  userData!: IUserWithId;
  constructor(
    private SharedService: SharedService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshSub = this.SharedService.getNavbarRefreshObservable().subscribe(
      () => {
        this.reloadNavbarData();
      }
    );

    this.reloadNavbarData(); // initial load
  }

  reloadNavbarData() {
    this.unauthorized = localStorage.getItem('token') == null;
    if (!this.unauthorized) {
      this.userService.getCurrentUser().subscribe((res: any) => {
        this.userData = res.user;
      });
    }
    // logic to reload navbar data (e.g., user info, links)
    console.log('Navbar reloaded');
  }

  ngOnDestroy(): void {
    this.refreshSub.unsubscribe();
  }

  getInitialsOfName() {
    if (!this.userData || !this.userData.fullName) return '';
    const names = this.userData.fullName.trim().split(' ');
    const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
    return initials;
  }
}
