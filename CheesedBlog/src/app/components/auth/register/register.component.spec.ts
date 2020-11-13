import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { MaterialModule } from '../../modules/material/material.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/services/auth.service';
import { click } from '../../utils/test.utils';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Register Template Testing', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: DebugElement;
  let authService: any;
  let authSpy: any;

  beforeEach(async(() => {
    authSpy = jasmine.createSpyObj('authService', [
      'loginUser',
      'registerUser',
    ]);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [MaterialModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [{ provide: AuthService, useValue: authSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        authService = TestBed.inject(AuthService);
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a mat-card', () => {
    const card = el.query(By.css('mat-card'));
    expect(card).toBeTruthy();
  });

  it('should render four form-fields', () => {
    const formFields = el.queryAll(By.css('mat-form-field'));
    expect(formFields.length).toBe(4);
  });

  it('should render a register button', () => {
    const registerButton = el.query(By.css('button'));
    expect(registerButton).toBeTruthy();
  });

  it('should call authService.registerUser() when the register button is clicked', () => {
    const registerButton = el.query(By.css('button'));
    click(registerButton);
    expect(authSpy.registerUser).toHaveBeenCalledTimes(1);
  });

  it('should have a max date property that prevents non-adults from registering', () => {
    fixture.detectChanges();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    expect(component.maxBirthDate.getFullYear()).toEqual(maxDate.getFullYear());
    expect(component.maxBirthDate.getMonth()).toEqual(maxDate.getMonth());
    expect(component.maxBirthDate.getDate()).toEqual(maxDate.getDate());
  });
});
