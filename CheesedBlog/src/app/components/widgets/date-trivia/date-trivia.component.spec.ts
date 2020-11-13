import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTriviaComponent } from './date-trivia.component';

describe('DateTriviaComponent', () => {
  let component: DateTriviaComponent;
  let fixture: ComponentFixture<DateTriviaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTriviaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
