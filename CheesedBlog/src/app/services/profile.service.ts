import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  changeUserPassword(newPassword: string) {
    this.http
      .put(
        `${environment.apiUrl}/profile/password`,
        { newPassword: newPassword },
        { withCredentials: true }
      )
      .subscribe(
        (response: ApiResponse) => {
          this.toastr.success(response.message, 'Success!');
        },
        (error) => {
          this.toastr.error(error.message, 'Error!');
        }
      );
  }
  deleteUserAccount() {
    this.http
      .delete(`${environment.apiUrl}/profile`, { withCredentials: true })
      .subscribe(
        () => {
          this.toastr.warning('User deleted. :(', 'Success!');
          this.router.navigate(['/posts']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
