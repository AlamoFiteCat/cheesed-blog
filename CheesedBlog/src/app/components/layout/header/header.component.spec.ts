import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MaterialModule } from '../../../modules/material/material.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Header Template Testing', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MaterialModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a brand span', () => {
    const brandSpan = el.query(By.css('.brand'));
    expect(brandSpan).toBeTruthy();
  });

  it('should call the logout method of the Auth Service when the logout button is clicked', () => {});

  xit('should render the login and register buttons when the vistor is not logged in', () => {});

  xit('should render the logout button when the visitor is logged in', () => {});
});
