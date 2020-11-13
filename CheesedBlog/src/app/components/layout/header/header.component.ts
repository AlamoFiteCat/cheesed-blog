// [Modules]
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// [Custom]
import { AuthService } from '../../../services/auth.service';
import { CurrentUser } from '../../../interfaces/current-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userLogged: boolean = false;
  currentUser: CurrentUser;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(
      (data: CurrentUser) => {
        if (data.currentEmail) {
          this.currentUser = data;
          this.userLogged = true;
        } else {
          this.userLogged = false;
        }
      }
    );
    this.authService.fetchCurrentUser();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onUserLogout() {
    this.authService.logoutUser();
    this.currentUser = undefined;
  }
}
