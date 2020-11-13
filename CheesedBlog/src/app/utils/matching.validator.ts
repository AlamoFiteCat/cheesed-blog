import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const MustMatch: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password.value === confirmPassword.value) {
    return null;
  } else {
    return { notMatching: true };
  }
};
