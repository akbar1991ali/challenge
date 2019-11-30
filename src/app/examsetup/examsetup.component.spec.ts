import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsetupComponent } from './examsetup.component';

describe('ExamsetupComponent', () => {
  let component: ExamsetupComponent;
  let fixture: ComponentFixture<ExamsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
