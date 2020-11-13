import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostWriteComponent } from './post-write.component';

describe('PostWriteComponent', () => {
  let component: PostWriteComponent;
  let fixture: ComponentFixture<PostWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostWriteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
