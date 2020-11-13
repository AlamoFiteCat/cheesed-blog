import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from '../../utils/matching.validator';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  changePasswordForm = new FormGroup(
    {
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ]),
      confirmPassword: new FormControl(null, Validators.required),
    },
    { validators: MustMatch }
  );

  deleteUserForm = new FormGroup({
    emailConfirmation: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
  });

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {}

  onSubmitNewPassword() {
    this.profileService.changeUserPassword(
      this.changePasswordForm.value['password']
    );
  }
  onSubmitDeleteUser() {
    this.profileService.deleteUserAccount();
  }
}
