// [Modules]
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// [Custom]
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // [Subjects]
  currentUser = new Subject<any>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  fetchCurrentUser() {
    return this.http
      .get(`${environment.apiUrl}/users/current`, {
        withCredentials: true,
      })
      .subscribe((user) => {
        this.currentUser.next(user);
      });
  }

  loginUser({ email, password }) {
    return this.http
      .post(
        `${environment.apiUrl}/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      .subscribe(
        (user) => {
          this.currentUser.next(user);
          this.router.navigate(['posts']);
          this.toastr.success('Welcome back!', 'Success!');
        },
        (error) => {
          this.toastr.error(error.error.message, 'Error!');
        }
      );
  }

  registerUser({ email, password, dateOfBirth, username, location }) {
    return this.http
      .post(
        `${environment.apiUrl}/auth/register`,
        {
          email,
          password,
          dateOfBirth,
          username,
          location,
        },
        { withCredentials: true }
      )
      .subscribe(
        (user) => {
          this.currentUser.next(user);
          this.router.navigate(['posts']);
          this.toastr.success('Welcome to our blog!', 'Success!');
        },
        (error) => {
          this.toastr.error(error.error.message, 'Error!');
        }
      );
  }

  logoutUser() {
    return this.http
      .post(
        `${environment.apiUrl}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .subscribe(
        (user) => {
          this.currentUser.next(user);
          this.router.navigate(['auth/login']);
          this.toastr.success('See you later!', 'Success!');
        },
        () => {
          this.toastr.error(
            'We could not log you out at the moment!',
            'Error!'
          );
        }
      );
  }
}
