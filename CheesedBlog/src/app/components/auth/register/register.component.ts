import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
    dateOfBirth: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    location: new FormControl('City...'),
  });

  maxBirthDate: Date;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.maxBirthDate = new Date();
    this.maxBirthDate.setFullYear(this.maxBirthDate.getFullYear() - 18);
  }

  onRegisterUser() {
    const {
      email,
      password,
      dateOfBirth,
      username,
      location,
    } = this.registerForm.value;
    this.authService.registerUser({
      email,
      password,
      dateOfBirth,
      username,
      location,
    });
  }
}
